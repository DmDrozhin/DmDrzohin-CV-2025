import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// This is where you can customize your theme
// https://vuetifyjs.com/en/features/theme/
export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light', // or 'dark'
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
    display: {
      mobileBreakpoint: 'sm',
      thresholds: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  },
});
