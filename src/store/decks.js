import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";

const state = {
  decks: [],
};

//const mutations = {}

const actions = {
  init: firestoreAction(({ bindFirestoreRef }) => {
    return bindFirestoreRef("decks", db.collection("decks"));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};

/*
const Deck = {
    name: "",
    iconUrl: "",
    diskId: "",
    userId: "",
    inviteCode: "",
    isDeleted: false,
    createdAt: timestamp
    updatedAt: timestamp
}
*/
