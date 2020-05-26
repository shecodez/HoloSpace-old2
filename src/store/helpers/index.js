import firebase from "@/plugins/firebase";

// readIds(db.collection('products'), ['foo','bar', 'baz'])
export const readIds = async (collection, ids) => {
  const READS = ids.map((id) => collection.doc(id).get());
  const RESULT = await Promise.all(READS);
  return RESULT.map((x) => x.data());
};

export const currentUser = () => firebase.auth().currentUser;

export const uid = () => (currentUser() || {}).uid;

export const { serverTimestamp } = firebase.firestore.FieldValue;
