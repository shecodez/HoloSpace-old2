import firebase from "@/plugins/firebase";

import db from "@/plugins/firestore";
const { serverTimestamp } = firebase.firestore.FieldValue;

let messagesRef = db.collection("messages");

const state = {
  messages: [],
  isLoading: false,
  error: null,
  query: null,
};

const mutations = {
  SET_CHAT: (state, payload) => (state.messages = payload),

  SET_ERROR: (state, payload) => (state.error = payload),

  CLEAR_ERROR: (state) => (state.error = null),

  SET_IS_LOADING: (state, payload) => (state.isLoading = payload),

  SET_QUERY: (state, payload) => (state.query = payload),

  CLEAR_QUERY: (state) => (state.query = null),
};

const actions = {
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  },

  setQuery({ commit }, searchTerm) {
    commit("SET_QUERY", searchTerm);
  },

  clearQuery({ commit }) {
    commit("CLEAR_QUERY");
  },

  async getChatByDiskId({ commit }, diskId = null) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let querySnapshot = await messagesRef
        .where("disk_id", "==", diskId)
        .orderBy("created_at")
        .limit(100)
        .get();
      let messages = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_CHAT", messages);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async sendMessage({ commit }, payload) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let newMessageRef = await messagesRef.doc();
      let message = {
        id: newMessageRef.id,
        ...payload, // payload: text/media/markup, disk_id
        user_id: await firebase.auth().currentUser.uid,
        created_at: serverTimestamp(),
      };
      await newMessageRef.set(message);
      //await newMessageRef.collection(payload.disk_id).doc().set(message)
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async editMessage({ commit }, message) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let ref = await messagesRef.doc(message.id);
      message.updated_at = serverTimestamp();
      await ref.update(message);
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
  filteredMessages: (state) =>
    state.query
      ? state.messages.filter((message) => {
          return (
            message.text.match(new RegExp(state.query, "gi")) ||
            message.markup.match(new RegExp(state.query, "gi"))
          );
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
