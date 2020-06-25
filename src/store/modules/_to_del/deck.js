import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";
//import mbrs from "./mbrs";

const DECKS = db.collection("decks");
const DISKS = db.collection("disks");
const { serverTimestamp } = firebase.firestore.FieldValue;

const state = {
  deckRef: [],
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

const createGeneralDisk = async function({ newDiskRef, deck_id }) {
  const GENERAL_DISK = {
    id: newDiskRef.id,
    name: "general", // TODO: translate to user local
    deck_id,
    user_id: firebase.auth().currentUser.uid,
    is_direct: false,
    type: "TEXT",
    is_Locked: true,
    is_deleted: false,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  };

  return newDiskRef.set(GENERAL_DISK);
};

const actions = {
  initDeckById: firestoreAction(({ bindFirestoreRef }, deck_id) => {
    const ID = deck_id === undefined ? null : deck_id;

    return bindFirestoreRef("deckRef", DECKS.where("id", "==", ID));
  }),

  async createDeck({ commit }, payload) {
    commit("setIsLoading", true);
    commit("clearError");

    let newDeckRef = await DECKS.doc();

    // try {
    //   await mbrs.actions.createMembership({
    //     user_id: firebase.auth().currentUser.uid,
    //     deck_id: newDeckRef.id,
    //   });
    // } catch (err) {
    //   commit("setError", err.message);
    //   commit("setIsLoading", false);
    //   return { error: true };
    // }

    let newDiskRef = await DISKS.doc();
    try {
      await createGeneralDisk({ newDiskRef, deck_id: newDeckRef.id });
    } catch (err) {
      commit("setError", err.message);
      commit("setIsLoading", false);
      return { error: true };
    }

    // payload: name, icon_url
    payload.id = newDeckRef.id;
    payload.user_id = firebase.auth().currentUser.uid;
    payload.user_ids = [payload.user_id];
    payload.disk_id = newDiskRef.id;
    payload.is_deleted = false;
    payload.created_at = serverTimestamp();
    payload.updated_at = payload.created_at;

    try {
      await newDeckRef.set(payload);
      return { error: false, deck: payload }; // TODO: change return { success: true, deck: payload }
    } catch (err) {
      commit("setError", err.message);
      return { error: true }; // TODO: change return { success: false, error: err.message }
    } finally {
      commit("setIsLoading", false);
    }
  },
  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  deck: (state) => (state.deckRef[0] ? state.deckRef[0] : {}),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
