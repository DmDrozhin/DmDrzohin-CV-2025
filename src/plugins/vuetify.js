import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { customTheme, defaults } from './vuetify.config';
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg';
// This is where you can customize your theme
// https://vuetifyjs.com/en/features/theme/
export default createVuetify({
  components,
  directives,
  theme: customTheme,
  defaults: defaults,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});
