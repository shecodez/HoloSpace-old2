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

export const toChunks = (arr, chunkSize) =>
  new Array(Math.ceil(arr.length / chunkSize))
    .fill()
    .map((_, i) => arr.slice(i * chunkSize, i * chunkSize + chunkSize));

export const generatePin = function() {
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
