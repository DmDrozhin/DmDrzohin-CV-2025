import { createApp } from 'vue';
import '@/styles/basic.scss';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';
import vuetify from '@/plugins/vuetify.js';

createApp(App).use(vuetify).mount('#app');
