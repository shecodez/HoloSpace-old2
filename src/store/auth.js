import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";

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

// const generatePin = () => {
//   let pin = Math.round(Math.random() * 10000);
//   if (pin < 1000) {
//     pin += 1000;
//   }
//   return pin;
// };

const actions = {
  register({ commit }, payload) {
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
            const USER = {
              id: user.uid,
              avatarJSON: null,
              pin: "0000", //generatePin(),
              isOnline: true,
              status: "SHOW",
              isDeleted: false,
            };

            db.collection("users")
              .doc(USER.id)
              .set(USER);

            commit("setUser", user);
          })
          .catch((err) => commit("setError", err.message));
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  login({ commit }, payload) {
    commit("setLoading", true);
    commit("clearError");
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(({ user }) => {
        commit("setUser", user);
      })
      .catch((err) => commit("setError", err.message))
      .finally(() => commit("setLoading", false));
  },

  getUserById({ commit }, payload) {
    db.collection("users")
      .doc(payload)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("store auth getUserById document data:", doc.data());
          commit("setUser", doc.data());
        }
      })
      .catch((err) => commit("setError", err.message));
  },

  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("logoutUser");
      })
      .catch((err) => console.error("store auth logout", err));
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
