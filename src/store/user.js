import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const USERS = db.collection("users");

const state = {
  userRef: [],
  loading: false,
  error: null,
};

const mutations = {
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
};

const actions = {
  initUserById: firestoreAction(({ bindFirestoreRef }) => {
    const ID = firebase.auth().currentUser.uid;

    return bindFirestoreRef("userRef", USERS.where("id", "==", ID));
  }),

  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  me: (state) => (state.userRef[0] ? state.userRef[0] : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
