import { createGlobalStyle } from 'styled-components';

const Fonts = createGlobalStyle`
  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-Light.woff') format('woff'),
      url('/fonts/Volte-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-LightItalic.woff') format('woff'),
      url('/fonts/Volte-LightItalic.woff2') format('woff2');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-Regular.woff') format('woff'),
      url('/fonts/Volte-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-RegularItalic.woff') format('woff'),
      url('/fonts/Volte-RegularItalic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-Medium.woff') format('woff'),
      url('/fonts/Volte-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-MediumItalic.woff') format('woff'),
      url('/fonts/Volte-MediumItalic.woff2') format('woff2');
    font-weight: 500;
    font-style: italic;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-Semibold.woff') format('woff'),
      url('/fonts/Volte-Semibold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-SemiboldItalic.woff') format('woff'),
      url('/fonts/Volte-SemiboldItalic.woff2') format('woff2');
    font-weight: 600;
    font-style: italic;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-Bold.woff') format('woff'),
      url('/fonts/Volte-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Volte';
    src: url('/fonts/Volte-BoldItalic.woff') format('woff'),
      url('/fonts/Volte-BoldItalic.woff2') format('woff2');
    font-weight: 700;
    font-style: italic;
  }
`;

export default Fonts;
