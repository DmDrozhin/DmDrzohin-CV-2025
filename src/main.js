import { createApp } from 'vue';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';
import { createPinia } from 'pinia';
import vuetify from '@/plugins/vuetify.js';
import '@mdi/font/css/materialdesignicons.css';
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount('#app');
