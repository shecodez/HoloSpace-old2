import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const DECKS = db.collection("decks");

const state = {
  decks: [],
  loading: false,
  error: null,
  dialog: false,
};

const mutations = {
  setDeck(state, payload) {
    state.deck = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  openDialog(state) {
    state.dialog = true;
  },
  closeDialog(state) {
    state.dialog = false;
  },
};

const actions = {
  init: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef("decks", DECKS.where("id", "==", id));
  }),
  async createDeck({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");

    let newDeckRef = await DECKS.doc();
    // TODO: create 'general' disk 1st

    payload.id = newDeckRef.id;
    payload.user_id = firebase.auth().currentUser.uid;
    payload.disk_id = "";
    payload.isDeleted = false;
    payload.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();

    newDeckRef
      .set(payload)
      .then(() => {
        //commit("closeDialog");
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  openDialog({ commit }) {
    commit("openDialog");
  },
  closeDialog({ commit }) {
    commit("closeDialog");
  },

  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  deck: (state) => (state.decks[0] ? state.decks[0] : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
