import Vue from 'vue';
import App from './App.vue';

import {store} from './store';
import {router} from './routes.js';

window.currentPage = new Vue({
  el: '#aspp',
  store,
  router,
  render: h => h(App)
})