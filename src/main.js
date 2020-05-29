import Vue from "vue";
import VueRx from "vue-rx";
import axios from "axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import i18n from "./plugins/i18n";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(VueRx); // TODO: import vueRx from "./plugins/vueRx";

let app;

const INITIALIZE = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  }
};

firebase.auth().onAuthStateChanged((user) => {
  // store.dispatch("auth/getUserById", user.uid)
  user
    ? store.commit("auth/setUser", user)
    : store.commit("auth/setUser", null);

  INITIALIZE();
});
