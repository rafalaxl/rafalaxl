import sys
import argparse
import json
import urllib.parse
from duckduckgo_search import DDGS
import requests
from bs4 import BeautifulSoup
import re

def buscar_empresas(query, localidade, max_results=5):
    """
    Busca empresas locais usando DuckDuckGo (simulando mapas)
    E extrai as URLs dos sites delas ou detecta se não possuem.
    """
    full_query = f"{query} em {localidade}"
    print(f"[*] Buscando empresas para: '{full_query}'...")
    
    empresas = []
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(full_query, max_results=max_results * 4))
            
            for r in results:
                url = r.get('href', '')
                title = r.get('title', '')
                snippet = r.get('body', '')
                
                # Ignorar páginas de pesquisa do próprio buscador ou blogs informativos de listas
                if any(x in url.lower() for x in ['duckduckgo.com', 'wikipedia.org', 'g1.globo', 'terra.com', 'uol.com']):
                    continue
                
                nome = title.split('-')[0].split('|')[0].strip()
                
                # Identifica se o principal resultado retornado para a empresa é uma rede social ou diretório
                eh_rede_social = any(x in url.lower() for x in ['instagram.com', 'facebook.com'])
                eh_diretorio = any(x in url.lower() for x in ['tripadvisor', 'yelp', 'guiamais', 'apontador', 'encontra', 'solutudo', 'telelistas', 'maps'])
                
                if eh_rede_social:
                    # Empresa identificada, mas o link direto dela é uma rede social (indício forte de que não tem site)
                    if nome not in [e['nome'] for e in empresas]:
                        empresas.append({
                            'nome': nome,
                            'site': 'NÃO POSSUI SITE (Usa apenas rede social)',
                            'url_referencia': url,
                            'sem_site': True,
                            'snippet': snippet
                        })
                elif eh_diretorio:
                    continue
                else:
                    # Tem site próprio
                    domain_match = re.match(r'https?://([^/]+)', url)
                    if domain_match:
                        domain = domain_match.group(0)
                        if domain not in [e['site'] for e in empresas]:
                            empresas.append({
                                'nome': nome,
                                'site': domain,
                                'url_referencia': url,
                                'sem_site': False,
                                'snippet': snippet
                            })
                
                if len(empresas) >= max_results:
                    break
    except Exception as e:
        print(f"[-] Erro ao buscar empresas: {e}")
        
    return empresas

def extrair_contatos_e_dores(site_url, sem_site=False, url_referencia=""):
    """
    Varre o site da empresa ou o link de rede social
    para capturar dados e diagnosticar a dor.
    """
    contatos = {'email': 'Não encontrado', 'telefone': 'Não encontrado', 'dor_design': 'Nenhuma perceptível'}
    
    if sem_site:
        contatos['email'] = 'Buscar via Direct / Redes Sociais'
        contatos['telefone'] = f'Verificar link: {url_referencia}'
        contatos['dor_design'] = 'Não possui site próprio (Inexistência Digital). Depende 100% de tráfego orgânico de terceiros e perde autoridade e clientes qualificados que buscam no Google.'
        return contatos

    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(site_url, headers=headers, timeout=8)
        
        if response.status_code != 200:
            contatos['dor_design'] = 'Site atual fora do ar ou inacessível (Erro HTTP)'
            return contatos
            
        soup = BeautifulSoup(response.text, 'html.parser')
        html_content = response.text
        
        # 1. Buscar e-mails usando regex
        emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', html_content)
        emails_filtrados = [e for e in emails if not e.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]
        if emails_filtrados:
            contatos['email'] = list(set(emails_filtrados))[0]
            
        # 2. Buscar telefones / WhatsApp
        wa_links = soup.find_all('a', href=re.compile(r'(wa\.me|api\.whatsapp\.com)'))
        if wa_links:
            match = re.search(r'(?:phone|send\?phone)=(\d+)', wa_links[0]['href'])
            if match:
                contatos['telefone'] = match.group(1)
        else:
            phones = re.findall(r'(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})', html_content)
            if phones:
                contatos['telefone'] = list(set(phones))[0].strip()
                
        # 3. Detectar problemas de design/tecnologia (Dores)
        dores = []
        if 'wp-content' in html_content:
            dores.append("Site lento construído em WordPress")
        if 'elementor' in html_content:
            dores.append("Usa construtor Elementor (bloated code)")
        if not soup.find('meta', attrs={'name': 'viewport'}):
            dores.append("Não responsivo / Ruim de ler no celular")
            
        images_without_lazy = len(soup.find_all('img', loading=False))
        if images_without_lazy > 8:
            dores.append("Falta otimização de imagens (Lazy Loading)")
            
        if dores:
            contatos['dor_design'] = " | ".join(dores)
        else:
            contatos['dor_design'] = "Design de site antigo / Stack desatualizada"
            
    except Exception as e:
        contatos['dor_design'] = 'Instabilidade técnica / Carregamento lento ao acessar'
        
    return contatos

def buscar_reviews_e_dores_publicas(nome_empresa, localidade):
    """
    Busca avaliações ou reviews negativos de clientes.
    """
    query = f"\"{nome_empresa}\" {localidade} reclamações OR avaliações"
    dores = []
    
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=3))
            for r in results:
                snippet = r.get('body', '').lower()
                if 'demora' in snippet or 'atraso' in snippet or 'espera' in snippet:
                    dores.append("Reclamações sobre fila de espera ou atraso")
                if 'telefone' in snippet or 'não atende' in snippet or 'whatsapp' in snippet:
                    dores.append("Dificuldade de contato / suporte lento")
                if 'preço' in snippet or 'caro' in snippet or 'orçamento' in snippet:
                    dores.append("Falta de transparência em preços")
    except Exception:
        pass
        
    return list(set(dores)) if dores else ["Problemas de agendamento manual / lentidão"]

def main():
    parser = argparse.ArgumentParser(description="Maps Lead Miner - Prospecção Ativa Local")
    parser.add_argument("--segmento", type=str, required=True, help="Ex: 'dentista', 'clinica estetica', 'restaurante'")
    parser.add_argument("--cidade", type=str, required=True, help="Ex: 'São Paulo', 'Curitiba'")
    parser.add_argument("--limite", type=int, default=5, help="Quantidade máxima de leads a extrair")
    args = parser.parse_args()

    empresas = buscar_empresas(args.segmento, args.cidade, args.limite)
    
    leads = []
    for emp in empresas:
        contatos = extrair_contatos_e_dores(emp['site'], sem_site=emp['sem_site'], url_referencia=emp['url_referencia'])
        dores_publicas = buscar_reviews_e_dores_publicas(emp['nome'], args.cidade)
        
        lead = {
            'empresa': emp['nome'],
            'site': emp['site'],
            'email': contatos['email'],
            'telefone': contatos['telefone'],
            'stack_dor': contatos['dor_design'],
            'dores_negocio': ", ".join(dores_publicas)
        }
        leads.append(lead)
        
    output_file = "leads_minerados.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(leads, f, ensure_ascii=False, indent=2)
        
    print(f"\n[+] Mineração concluída! {len(leads)} leads salvos em '{output_file}'.")
    print(json.dumps(leads, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
