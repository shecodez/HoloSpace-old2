import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const MBRS = db.collection("memberships");

const state = {
  memberships: [],
};

//const mutations = {}

const actions = {
  initDecksByUserId: firestoreAction(({ bindFirestoreRef }) => {
    const ME = firebase.auth().currentUser.uid;
    return bindFirestoreRef("memberships", MBRS.where("user_id", "==", ME));
  }),

  async createMembership({ user_id, deck_id }) {
    return MBRS.add({
      user_id,
      deck_id,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
};
