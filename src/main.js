import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import axios from "axios";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

let app;

const INITIALIZE = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
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
