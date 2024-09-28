import './assets/main.css'

import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.mount('#app')
