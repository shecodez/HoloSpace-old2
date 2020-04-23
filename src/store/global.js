const state = {
  isDark: true,
  alertType: "",
  alertText: "",
  showAppBar: false,
  showDrawer: false,
  showFooter: false,
};

const mutations = {
  toggleTheme(state) {
    state.isDark = !state.isDark;
  },
  setAlert(state, payload) {
    state.alertType = payload.type; // i.e. info, error, success, warning
    state.alertText = payload.text;
  },
  clearAlert(state) {
    state.alertType = "";
    state.alertText = "";
  },
  setShowAppBar(state, payload) {
    state.showAppBar = payload;
  },
  setShowFooter(state, payload) {
    state.showFooter = payload;
  },
};

const actions = {
  toggleTheme({ commit }) {
    commit("toggleTheme");
  },
  setAlert({ commit }, payload) {
    commit("setAlert", payload);
  },
  clearAlert({ commit }) {
    commit("clearAlert");
  },
  setShowAppBar({ commit }, payload) {
    commit("setShowAppBar", payload);
  },
  setShowFooter({ commit }, payload) {
    commit("setShowFooter", payload);
  },
};

const getters = {
  showAlert: (state) => !!state.alertText,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
