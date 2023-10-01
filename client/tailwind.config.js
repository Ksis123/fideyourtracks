module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ff6d38",
        "secondary": "#262626",
        "active": "#ed9624",
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
  
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '15rem',
        DEFAULT: '15px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '30px',
        'large': '12px',
      }
    },
    plugins: [],
  }
}

