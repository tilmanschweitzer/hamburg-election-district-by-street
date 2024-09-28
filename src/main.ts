import './assets/main.css'

import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import App from './App.vue'
import { definePreset } from '@primevue/themes'

const app = createApp(App);
const myPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#502379',
      100: '#502379',
      200: '#502379',
      300: '#502379',
      400: '#502379',
      500: '#502379',
      600: '#502379',
      700: '#502379',
      800: '#502379',
      900: '#502379',
      950: '#502379'
    }
  }
});

app.use(PrimeVue, {
  theme: {
    preset: myPreset
  }
});
app.mount('#app')
