import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";

let usersRef = db.collection("users");

const state = {
  userRef: {},
  isLoading: false,
  error: null,
};

const mutations = {
  SET_USER_REF: (state, payload) => (state.userRef = payload),

  SET_ERROR: (state, payload) => (state.error = payload),

  CLEAR_ERROR: (state) => (state.error = null),

  SET_IS_LOADING: (state, payload) => (state.isLoading = payload),
};

const actions = {
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  },

  async getMeByUid({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      let userRef = await usersRef.doc(ME).get();
      commit("SET_USER_REF", userRef);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async setMeOnline({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      await usersRef.doc(ME).update({ is_online: true });
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async setMeOffline({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      if (ME) {
        await usersRef.doc(ME).update({ is_online: false });
        return { success: true };
      }
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async setMyStatus({ commit }, status) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      await usersRef.doc(ME).update({ status });
      let userRef = await usersRef.doc(ME).get();
      commit("SET_USER_REF", userRef);
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
  me: (state) => (state.userRef.exists ? state.userRef.data() : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
