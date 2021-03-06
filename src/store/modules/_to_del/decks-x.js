import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";

const state = {
  decks: [],
};

//const mutations = {}

const actions = {
  initDecksByUserId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("decks", db.collection("decks"));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
