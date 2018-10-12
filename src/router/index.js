import Vue from "vue";
import { store } from "./../store";

import Login from "./../components/Login";
import Domains from "./../components/Domains";
import Aliases from "./../components/Aliases";
import Emails from "./../components/Emails";
import PageNotFound from "./../components/PageNotFound";

import VueRouter from "vue-router";

const routes = [
  { path: "/", name: "login", component: Login },
  { path: "/dominios", name: "domains", component: Domains },
  { path: "/aliases", name: "aliases", component: Aliases },
  { path: "/emails", name: "emails", component: Emails },
  { path: "*", name: "404", component: PageNotFound },
  { path: "*", name: "403", component: PageNotFound }
];

const router = new VueRouter({
  mode: "history",
  routes
});

Vue.use(VueRouter);

router.beforeEach((to, from, next) => {
  switch (to.name) {
    case "domains":
    case "aliases":
    case "emails":
      if (!store.getters.authToken) {
        next({ path: "/", replace: true });
      }
      break;
  }
  next();
});

export {
  router
};
