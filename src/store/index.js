import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import app from "./app";
import auth from "./auth";
import chat from "./chat";
import deck from "./deck";
import decks from "./decks";
import disk from "./disk";
import disks from "./disks";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: vuexfireMutations,
  modules: {
    app,
    auth,
    chat,
    deck,
    decks,
    disk,
    disks,
    users,
  },
});
