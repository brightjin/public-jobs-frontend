/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    // 동적 클래스들을 안전 목록에 추가
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-white',
    'bg-gray-50',
    'bg-gray-100',
    'bg-gray-200',
    'bg-gray-700',
    'bg-gray-800',
    'text-white',
    'text-black',
    'text-gray-300',
    'text-gray-400',
    'text-gray-600',
    'text-gray-700',
    'text-gray-900',
    'border-gray-200',
    'border-gray-700',
    'hover:bg-gray-300',
    'hover:bg-gray-600',
    'dark:bg-gray-700',
    'dark:bg-gray-800',
    'dark:text-gray-200',
    'dark:text-white',
    'dark:border-gray-600',
    'dark:border-gray-700',
    'dark:hover:bg-gray-600'
  ],
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
  plugins: [
    require('@tailwindcss/typography')
  ]
}