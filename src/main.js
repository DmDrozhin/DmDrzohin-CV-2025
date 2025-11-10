import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from '@/plugins/vuetify.js';
import '@/styles/global.scss';
// import '@mdi/font/css/materialdesignicons.css';
const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).mount('#app');
