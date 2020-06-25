import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";
const { serverTimestamp } = firebase.firestore.FieldValue;

let decksRef = db.collection("decks");

const state = {
  decks: [],
  deckRef: {},
  isLoading: false,
  error: null,
  query: null,
};

const mutations = {
  SET_DECKS: (state, payload) => (state.decks = payload),

  SET_DECK_REF: (state, payload) => (state.deckRef = payload),

  SET_ERROR: (state, payload) => (state.error = payload),

  CLEAR_ERROR: (state) => (state.error = null),

  SET_IS_LOADING: (state, payload) => (state.isLoading = payload),
};

const actions = {
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  },

  async getDeckById({ commit }, deckId = null) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let deckRef = await decksRef.doc(deckId).get();
      commit("SET_DECK_REF", deckRef);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async getDecksByUid({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      let querySnapshot = await decksRef
        .where("user_ids", "array-contains", ME)
        .limit(100)
        .get();
      let decks = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_DECKS", decks);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async addNew({ commit }, payload) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      let newDeckRef = await decksRef.doc();
      let newDiskRef = await db.collection("disks").doc();
      // await db.collection("memberships").add({
      //   user_id: ME,
      //   deck_id: newDeckRef.id,
      //   timestamp: serverTimestamp(),
      // });
      await newDiskRef.set({
        id: newDiskRef.id,
        name: "general", // TODO: translate to user local
        deck_id: newDeckRef.id,
        type: "TEXT",
        is_direct: false,
        is_Locked: true,
        user_id: ME,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      let deck = {
        id: newDeckRef.id,
        ...payload, // payload: name, icon_url
        disk_id: newDiskRef.id,
        user_id: ME,
        user_ids: [ME],
        created_at: serverTimestamp(),
        updated_at: null,
      };
      await newDiskRef.set(deck);
      return { success: true, deck };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async update({ commit }, deck) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let ref = await decksRef.doc(deck.id);
      deck.updated_at = serverTimestamp();
      await ref.update(deck);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },
};

const getters = {
  deck: (state) => (state.deckRef.exists ? state.deckRef.data() : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
