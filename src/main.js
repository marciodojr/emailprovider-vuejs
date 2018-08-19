import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import Login from "./components/Login";
import Domains from "./components/Domains";
import Aliases from "./components/Aliases";
import Emails from "./components/Emails";

import VueRouter from 'vue-router';

const routes = [
  { path: '/', name: 'login', component: Login },
  { path: '/dominios', name: 'domains', component: Domains },
  { path: '/aliases', name: 'aliases', component: Aliases },
  { path: '/emails', name: 'emails', component: Emails },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

Vue.use(VueRouter);



import { store } from './store';

import VeeValidate, { Validator } from 'vee-validate';
import messagesBr from "vee-validate/dist/locale/pt_BR";

Validator.localize('pt_BR', messagesBr);
Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
