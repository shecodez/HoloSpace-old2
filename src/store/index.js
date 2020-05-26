import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";

import app from "./modules/app";
import auth from "./modules/auth";
import chat from "./modules/chat";
import deck from "./modules/deck";
import decks from "./modules/decks";
import disk from "./modules/disk";
import disks from "./modules/disks";
import file from "./modules/file";
import user from "./modules/user";
import users from "./modules/users";

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
    file,
    user,
    users,
  },
});
