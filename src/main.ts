import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import localStoragePlugin from './plugins/pinia/localStoragePlugin';
import router from './router';

const app = createApp(App);

const pinia = createPinia();

function ourPlugin() {
  return {
    secret: 'Work Hard',
  };
}
pinia.use(ourPlugin);
pinia.use(localStoragePlugin);
app.use(pinia);
app.use(router);

app.mount('#app');
