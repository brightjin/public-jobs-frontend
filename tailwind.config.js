/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071e3',
        'apple-light': '#5ac8fa',
        'apple-orange': '#ff9500',
        'apple-bg-light': '#f5f5f7',
        'apple-bg-dark': '#1d1d1f',
        'apple-text': '#1c1c1e',
        'apple-text-secondary': '#86868b',
        'success': '#34C759',
        'warning': '#FF9500',
        'error': '#FF3B30'
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: []
}