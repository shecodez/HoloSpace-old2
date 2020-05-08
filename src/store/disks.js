import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";

const DISKS = db.collection("disks");

const state = {
  disks: [],
};

//const mutations = {}

const actions = {
  initDisksByDeckId: firestoreAction(({ bindFirestoreRef }, deck_id) => {
    return bindFirestoreRef("disks", DISKS.where("deck_id", "==", deck_id));
  }),
};

const getters = {
  textDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "TEXT") : [],
  voipDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "VOIP") : [],
  holoDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "HOLO") : [],
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
};
