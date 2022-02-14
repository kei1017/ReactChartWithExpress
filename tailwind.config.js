/* eslint-disable sort-keys-fix/sort-keys-fix */

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#181819',
          200: '#383839',
          600: '#565757',
          700: '#6A6A6B',
          800: '#929293',
          900: '#FAFBFC',
        },
        blue: {
          800: '#327DCF',
        },
        yellow: {
          600: '#f7ac41',
        },
        dark: {
          100: '#637381',
        },
      },
      fontFamily: {
        volte: 'Volte',
      },
      fontSize: {
        '2xs': '.625rem', // 10px
      },
      backgroundSize: {
        '50%': '50%',
      },
      boxShadow: {
        '3xl': '0 25px 35px rgba(99, 115, 129, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
