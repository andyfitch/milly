module.exports = {
  mode: 'jit',
  purge: [
    './*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: '#fcc418'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
