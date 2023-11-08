import type { Config } from 'tailwindcss'
// {js,ts,jsx,tsx,mdx}
const config: Config = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/app/**/*.tsx',
    './src/**/*.tsx'
  ],
  theme: {
    borderRadius: {
      'md': '15px'
    },
    screens: {
      'sm': '390px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px'
    },
    extend: {
      boxShadow: {
        'md': '4px 4px 10px rgba(255, 255, 255, 0.25)'
      },
      colors: {
        'utmist-purple': '#8C51FF'
      },
      backgroundImage: {
        'banner-small': "url('/assets/BannerSmall.svg')",
        'banner-large': "url('/assets/Banner.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'roboto-mono': ['"Roboto Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
export default config
