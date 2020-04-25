const state = {
  isDark: true,
  alertType: "",
  alertText: "",
  showAppBar: false,
  showDrawer: false,
  showFooter: false,
  sideDrawerIsOpen: true,
  metaDrawerIsMini: false,
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
  setSideDrawerIsOpen(state, payload) {
    state.sideDrawerIsOpen = payload;
  },
  setMetaDrawerIsMini(state, payload) {
    state.metaDrawerIsMini = payload;
  },
  toggleSideDrawerIsOpen(state) {
    state.sideDrawerIsOpen = !state.sideDrawerIsOpen;
  },
  toggleMetaDrawerIsMini(state) {
    state.metaDrawerIsMini = !state.metaDrawerIsMini;
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
  setSideDrawerIsOpen({ commit }, payload) {
    commit("setSideDrawerIsOpen", payload);
  },
  setMetaDrawerIsMini({ commit }, payload) {
    commit("setMetaDrawerIsMini", payload);
  },
  toggleSideDrawerIsOpen({ commit }) {
    commit("toggleSideDrawerIsOpen");
  },
  toggleMetaDrawerIsMini({ commit }) {
    commit("toggleMetaDrawerIsMini");
  },
};

const getters = {
  showAlert: (state) => !!state.alertText,
  sideDrawerIsOpen: (state) => state.sideDrawerIsOpen,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
