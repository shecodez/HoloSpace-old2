import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import app from "./app";
import auth from "./auth";
import deck from "./deck";
import decks from "./decks";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    app,
    auth,
    deck,
    decks,
  },
});
