import { firestoreAction } from "vuexfire";
import db from "@/plugins/firestore";
import firebase from "@/plugins/firebase";

const SUBS = db.collection("subscriptions");
const { serverTimestamp } = firebase.firestore.FieldValue;

const state = {
  subscriptions: [],
};

//const mutations = {}

const actions = {
  initDisksByUserId: firestoreAction(({ bindFirestoreRef }) => {
    const ME = firebase.auth().currentUser.uid;
    return bindFirestoreRef("subscriptions", SUBS.where("user_id", "==", ME));
  }),

  async batchCreateSubscriptions({ user_ids, disk_id }) {
    const BATCH = db.batch();

    user_ids.map((user_id) => {
      BATCH.set(SUBS.doc(), {
        user_id,
        disk_id,
        timestamp: serverTimestamp(),
      });
    });
    return BATCH.commit();
  },
};

export default {
  namespaced: true,
  state,
  actions,
};

// const ref = db.collection('subscriptions');
// ref.add({ disk_id, subscribers: [...user_ids ] })
// // add
// ref.update({
//   disk_id: firebase.firestore.FieldValue.arrayUnion('user_id')
// })
// // remove
// ref.update({
//   disk_id: firebase.firestore.FieldValue.arrayRemove('user_id')
// })
// ref.where('subscribers', 'array-contains', 'user_id')
