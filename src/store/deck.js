import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const DECKS = db.collection("decks");

const state = {
  deckRef: [],
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

const createGeneralDisk = async function(deck_id) {
  let newDiskRef = await db.collection("disks").doc();

  const GENERAL_DISK = {
    id: newDiskRef.id,
    name: "general", // TODO: translate to user local
    deck_id,
    user_id: firebase.auth().currentUser.uid,
    is_shh: false,
    type: "TEXT",
    can_be_deleted: false,
    is_deleted: false,
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    updated_at: firebase.firestore.FieldValue.serverTimestamp(),
  };

  try {
    await newDiskRef.set(GENERAL_DISK);
    return { error: false, disk_id: newDiskRef.id };
  } catch (err) {
    return { error: true, err };
  }
};

const actions = {
  initDeckById: firestoreAction(({ bindFirestoreRef }, deck_id) => {
    const ID = deck_id === undefined ? null : deck_id;

    return bindFirestoreRef("deckRef", DECKS.where("id", "==", ID));
  }),
  async createDeck({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");

    let newDeckRef = await DECKS.doc();
    let newDiskRes = await createGeneralDisk(newDeckRef.id);

    if (newDiskRes.error) {
      commit("setError", newDiskRes.err.message);
      commit("setLoading", false);
      return;
    }

    payload.id = newDeckRef.id;
    payload.user_id = firebase.auth().currentUser.uid;
    payload.disk_id = newDiskRes.disk_id;
    payload.is_deleted = false;
    payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
    payload.updated_at = payload.created_at;

    try {
      await newDeckRef.set(payload);
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
  deck: (state) => (state.deckRef[0] ? state.deckRef[0] : {}),
  isCaptain: (state) =>
    state.deckRef[0]
      ? state.deckRef[0].user_id === firebase.auth().currentUser.uid
      : false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
