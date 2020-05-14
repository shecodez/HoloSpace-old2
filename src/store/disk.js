import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const DISKS = db.collection("disks");

const state = {
  diskRef: [],
  isLoading: false,
  error: null,
};

const mutations = {
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setIsLoading(state, payload) {
    state.isLoading = payload;
  },
};

const actions = {
  initDiskById: firestoreAction(({ bindFirestoreRef }, disk_id) => {
    const ID = disk_id === undefined ? null : disk_id;

    return bindFirestoreRef("diskRef", DISKS.where("id", "==", ID));
  }),
  async createDisk({ commit }, payload) {
    commit("setIsLoading", true);
    commit("clearError");

    let newDiskRef = await DISKS.doc();
    // TODO: if(payload.type === 'HOLO') create new holospace doc
    payload.id = newDiskRef.id;
    // payload: name, topic, type, deck_id
    payload.user_id = firebase.auth().currentUser.uid;
    payload.is_direct = false;
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
      commit("setIsLoading", false);
    }
  },

  async createDirectDisk({ commit }, payload) {
    commit("setIsLoading", true);
    commit("clearError");

    let newDiskRef = await DISKS.doc();
    // TODO: if(payload.type === 'HOLO') create new holospace doc
    payload.id = newDiskRef.id;
    // payload: name, topic, type, deck_id || user_ids
    payload.user_id = firebase.auth().currentUser.uid;
    payload.is_direct = true;
    if (payload.type === "HOLO") payload.holospace_id = "";
    if (payload.type !== "TEXT") payload.children = []; // users on disk
    payload.can_be_deleted = true;
    payload.is_deleted = false;
    payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
    payload.updated_at = payload.created_at;

    try {
      await newDiskRef.set(payload);
      return { error: false, disk: payload };
    } catch (err) {
      commit("setError", err.message);
      return { error: true };
    } finally {
      commit("setIsLoading", false);
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
