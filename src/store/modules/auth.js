import firebase from "@/plugins/firebase";

const state = {
  user: null,
  loading: false,
  error: null,
};

const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  logoutUser(state) {
    state.user = null;
  },
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
  register({ commit, dispatch }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(({ user }) => {
        user
          .updateProfile({
            displayName: payload.username,
          })
          .then(() => {
            commit("setUser", user);
            dispatch(
              "user/createUser",
              { id: user.uid, name: user.displayName },
              { root: true }
            );
          })
          .catch((err) => commit("setError", err.message));
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  login({ commit, dispatch }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(({ user }) => {
        commit("setUser", user);
        dispatch("user/setUserOnline", null, { root: true });
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  async logout({ commit, dispatch }) {
    await dispatch("user/setUserOffline", null, { root: true });
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("logoutUser");
        dispatch(
          "app/setAlert",
          { type: "info", text: "You are logged out." },
          { root: true }
        );
      })
      .catch((err) => {
        dispatch(
          "app/setAlert",
          { type: "error", text: err.message },
          { root: true }
        );
      });
  },

  resetPassword({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .sendPasswordResetEmail(payload.email)
      .then((res) => {
        console.log("store auth resetPassword", res);
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  isLoggedIn: (state) => !!state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

//const { uid } = await auth.currentUser;
