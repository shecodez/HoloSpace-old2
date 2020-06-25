import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";

const USERS = db.collection("users");

const state = {
  members: [],
  fellows: [],
  friends: [],
};

//const mutations = {}

const actions = {
  initUsersByDeckId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("members", USERS);
  }),
  initUsersByDiskId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("fellows", USERS);
  }),
  initUsersByUserId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("friends", USERS);
  }),
};

const getters = {
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
  actions,
  getters,
};
