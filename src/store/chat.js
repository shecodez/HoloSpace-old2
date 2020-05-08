import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const CHAT = db.collection("messages");

const state = {
  messages: [],
  loading: false,
  error: null,
  query: "",
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
  setQuery(state, payload) {
    state.query = payload;
  },
  clearQuery(state) {
    state.query = "";
  },
};

const actions = {
  initChatByDiskId: firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef(
      "messages",
      CHAT.where("disk_id", "==", id).orderBy("created_at")
    );
  }),

  async createMessage({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");

    let newMessageRef = await CHAT.doc();

    // payload: text, disk_id
    payload.id = newMessageRef.id;
    payload.user_id = firebase.auth().currentUser.uid;
    payload.is_deleted = false;
    payload.created_at = firebase.firestore.FieldValue.serverTimestamp();
    // payload.updated_at = payload.created_at;

    try {
      await newMessageRef.set(payload);
      return { error: false };
    } catch (err) {
      commit("setError", err.message);
      return { error: true };
    } finally {
      commit("setLoading", false);
    }
  },

  async updateMessage({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");

    let messageRef = await CHAT.doc(payload.id);

    // payload: id, text, disk_id, user_id, is_deleted, created_at
    payload.updated_at = firebase.firestore.FieldValue.serverTimestamp();

    try {
      await messageRef.set(payload);
      return { error: false };
    } catch (err) {
      commit("setError", err.message);
      return { error: true };
    } finally {
      commit("setLoading", false);
    }
  },

  clearError({ commit }) {
    commit("clearError");
  },

  setQuery({ commit }, payload) {
    commit("setQuery", payload);
  },

  clearQuery({ commit }) {
    commit("clearQuery");
  },
};

const getters = {
  filteredMessages: (state) =>
    state.query
      ? state.messages.filter((message) => {
          return message.text.match(new RegExp(state.query, "gi"));
        })
      : state.messages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
