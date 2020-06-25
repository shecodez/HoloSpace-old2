import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";
import { toChunks, generatePin } from "../helpers";
const { serverTimestamp } = firebase.firestore.FieldValue;

let usersRef = db.collection("users");
let friendsRef = db.collection("friends");

const state = {
  members: [],
  friends: [],
  subscribers: [],
  userRef: {},
  isLoading: false,
  error: null,
  query: null,
};

const mutations = {
  SET_MEMBERS: (state, payload) => (state.members = payload),

  SET_FRIENDS: (state, payload) => (state.members = payload),

  SET_SUBSCRIBERS: (state, payload) => (state.members = payload),

  SET_USER_REF: (state, payload) => (state.userRef = payload),

  SET_ERROR: (state, payload) => (state.error = payload),

  CLEAR_ERROR: (state) => (state.error = null),

  SET_IS_LOADING: (state, payload) => (state.isLoading = payload),
};

const actions = {
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  },

  async getUserById({ commit }, userId = null) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let userRef = await usersRef.doc(userId).get();
      commit("SET_USER_REF", userRef);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async getMbrsByDeckId({ commit }, deckId) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let deckRef = await db
        .collection("decks")
        .doc(deckId)
        .get();
      let { user_ids } = deckRef.data();
      let chunks = await Promise.all(
        toChunks(user_ids, 10).map(async (chunk) => {
          let querySnapshot = await usersRef.where("id", "in", chunk).get();
          let users = querySnapshot.docs.map((doc) => {
            return doc.data();
          });
          return users;
        })
      );
      let members = [].concat.apply([], chunks);
      commit("SET_MEMBERS", members);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async getMbrsByUserIds({ commit }, userIds) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let chunks = toChunks(userIds, 10).map((chunk) => {
        return usersRef.where("id", "in", chunk).get();
      });
      let members = chunks.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_MEMBERS", members);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  // TODO: getDiskSubscribers({ commit }, diskId) {}

  async getFriendsOfUid({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      let querySnapshot = await friendsRef
        .where("user_id", "==", ME)
        .limit(100)
        .get();
      let friends = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_FRIENDS", friends);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async createUser({ commit }, payload) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let user = {
        ...payload, // payload: id, name
        pin: generatePin(), // holoTagPin(name),
        is_online: true,
        status: "SHOW",
        is_deleted: false,
        created_at: serverTimestamp(),
        updated_at: null,
      };
      await usersRef.doc(payload.id).set(user);
      return { success: true, user };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },
};

const getters = {
  user: (state) => (state.userRef.exists ? state.userRef.data() : {}),
  membersById(state) {
    return state.members.reduce((byId, member) => {
      byId[member.id] = member;
      return byId;
    }, {});
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
