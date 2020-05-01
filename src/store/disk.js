import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const DISKS = db.collection("disks");

const state = {
  diskRef: [],
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
  getDiskById: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef("diskRef", DISKS.where("id", "==", id));
  }),
  async createDisk({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");

    let newDiskRef = await DISKS.doc();
    // TODO: if(payload.type === 'HOLO') create new holospace doc
    payload.id = newDiskRef.id;
    // payload: name, topic, type, deck_id, is_shh
    payload.user_id = firebase.auth().currentUser.uid;
    if (!payload.is_shh) payload.is_shh = false;
    if (payload.type === "HOLO") payload.holospace_id = "";
    if (payload.type !== "TEXT") payload.children = []; // users on disk
    payload.can_be_deleted = true;
    payload.is_deleted = false;
    payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
    payload.updated_at = payload.created_at;

    try {
      await newDiskRef.set(payload);
      return payload;
    } catch (err) {
      commit("setError", err.message);
      return null;
    } finally {
      commit("setLoading", false);
    }
  },

  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  disk: (state) => (state.diskRef[0] ? state.diskRef[0] : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
