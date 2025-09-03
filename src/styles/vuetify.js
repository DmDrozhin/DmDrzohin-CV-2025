import 'vuetify/styles';
import { createVuetify } from 'vuetify';

export default createVuetify({
  display: {
    mobileBreakpoint: 'sm', // до sm считается mobile
    thresholds: {
      xs: 0,
      sm: 500, // вместо 600
      md: 900, // вместо 960
      lg: 1200, // вместо 1280
      xl: 1600, // вместо 1920
    },
  },
});
