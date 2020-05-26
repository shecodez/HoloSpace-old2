import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import { uid, serverTimestamp } from "@/store/helpers";

const USERS = db.collection("users");

const state = {
  userRef: [],
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

const generatePin = function() {
  let pin = Math.round(Math.random() * 10000);
  if (pin < 1000) {
    pin += 1000;
  }
  return pin;
};

// TODO: user.name and #user.pin combo must be unique
// const holoTagPin = async function(name) {
//   let pin;
//   let isUser;
//   do {
//     pin = generatePin();
//     isUser = await !!USERS.where("name", "==", name).where("pin", "==", pin);
//   } while (isUser);
//   return pin;
// };

const actions = {
  initUserById: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("userRef", USERS.where("id", "==", uid()));
  }),

  createUser(_, { id, name }) {
    const NEW_USER = {
      id,
      icon_url: "",
      avatar_id: "", // TODO: create avatar doc
      name,
      pin: generatePin(), // holoTagPin(name),
      is_online: true,
      status: "SHOW",
      is_deleted: false,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    };

    return USERS.doc(id).set(NEW_USER);
  },

  setUserOnline() {
    USERS.doc(uid()).update({ is_online: true });
  },
  setUserOffline() {
    if (uid()) {
      USERS.doc(uid()).update({ is_online: false });
    }
  },
  setUserStatus(_, payload) {
    USERS.doc(uid()).update({ status: payload });
  },

  clearError({ commit }) {
    commit("clearError");
  },
};

const getters = {
  me: (state) => (state.userRef[0] ? state.userRef[0] : {}),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
