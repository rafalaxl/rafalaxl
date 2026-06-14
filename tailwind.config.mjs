/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        base: '#09090B',
        surface: '#18181B',
        elevated: '#27272A',
        primary: '#FAFAFA',
        secondary: '#A1A1AA',
        muted: '#71717A',
        'accent-primary': '#3B82F6',
        'accent-secondary': '#8B5CF6',
        'accent-glow': 'rgba(59, 130, 246, 0.4)',
        'status-success': '#10B981',
        'status-error': '#EF4444',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
