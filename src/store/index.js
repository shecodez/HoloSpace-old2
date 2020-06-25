import Vue from "vue";
import Vuex from "vuex";
//import { vuexfireMutations } from "vuexfire";

import app from "./modules/app";
import auth from "./modules/auth";
import chat from "./modules/chat";
import decks from "./modules/decks";
import disks from "./modules/disks";
import file from "./modules/file";
import me from "./modules/me";
import users from "./modules/users";

Vue.use(Vuex);

export default new Vuex.Store({
  //mutations: vuexfireMutations,
  modules: {
    app,
    auth,
    chat,
    decks,
    disks,
    file,
    me,
    users,
  },
});

/*
Update elements in an array

// Atomically add a new region to the "regions" array field.
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayUnion("greater_virginia")
});
// Atomically remove a region from the "regions" array field.
washingtonRef.update({
    regions: firebase.firestore.FieldValue.arrayRemove("east_coast")
});
*/
