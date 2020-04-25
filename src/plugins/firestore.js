import firebase from "@/plugins/firebase";
import "firebase/firestore";

const DB = firebase.firestore();

//const { TimeStamp, GeoPoint } = firebase.firestore;
//export { TimeStamp, GeoPoint };

export default DB;
