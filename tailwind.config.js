module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  
    './index.html',  
  ],
  theme: {
    extend: {
      fontFamily: {
        prata: ['"Prata"', 'serif'],
        rubik: ['"Rubik Dirt"', 'serif'],
        petrona: ['"Petrona"', 'serif'],
        play: ['"Playfair Display SC"', 'serif'],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        'custom-light': '#F0E0E5',
        'custom-medium': '#BA8C99',
        'custom-dark': '#6A3949',
        'custom-deep': '#5D3C4E',
      },
      spacing: {
        100: '100px',
        200: '200px',
      },
    },
  },
  plugins: [],
};
