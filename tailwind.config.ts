import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    // './src/components/**/*.{js,jsx,ts,tsx}',
    // './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-darkgreen': '#0f5028',
        'brand-lightgreen': '#8cbe3f',
        'brand-gray': '#9b9da0',
        'gray-800': '#333333', 
        'blue-700': '#0056b3', 
        'teal-400': '#61dafb', 
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        cormorant: ['Inter', 'serif'],
        allura: ['Allura', 'cursive'],

      },
      fontSize: {
        'xxl': '2rem', 
        'xl': '1.5rem', 
        'lg': '1.2rem',
        'xs': '0.25rem', 
      },
  
      maxWidth: {
        '1200': '1200px',
      },
      height: {
        '40vmin': '40vmin',
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui')
  ]
};
