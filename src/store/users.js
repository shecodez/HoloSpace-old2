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
  getUsersByDeckId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("members", USERS);
  }),
  getUsersByDiskId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("fellows", USERS);
  }),
  getUsersByUserId: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("friends", USERS);
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
