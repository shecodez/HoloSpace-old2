import firebase from "@/plugins/firebase";
import db from "@/plugins/firestore";
const { serverTimestamp } = firebase.firestore.FieldValue;

let disksRef = db.collection("disks");

const state = {
  disks: [],
  diskRef: {},
  isLoading: false,
  error: null,
  query: null,
};

const mutations = {
  SET_DISKS: (state, payload) => (state.disks = payload),

  SET_DISK_REF: (state, payload) => (state.diskRef = payload),

  SET_ERROR: (state, payload) => (state.error = payload),

  CLEAR_ERROR: (state) => (state.error = null),

  SET_IS_LOADING: (state, payload) => (state.isLoading = payload),
};

const actions = {
  clearError({ commit }) {
    commit("CLEAR_ERROR");
  },

  async getDiskById({ commit }, diskId = null) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let diskRef = await disksRef.doc(diskId).get();
      commit("SET_DISK_REF", diskRef);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async getDisksByDeckId({ commit }, diskId = null) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let querySnapshot = await disksRef
        .where("deck_id", "==", diskId)
        .orderBy("name")
        .limit(100)
        .get();
      let disks = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_DISKS", disks);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async getDisksByUid({ commit }) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      const ME = await firebase.auth().currentUser.uid;
      let querySnapshot = await disksRef
        .where("user_ids", "array-contains", ME)
        .orderBy("name")
        .limit(100)
        .get();
      let disks = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      commit("SET_DISKS", disks);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async addNew({ commit }, payload) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let newDiskRef = await disksRef.doc();
      let disk = {
        id: newDiskRef.id,
        ...payload, // payload: name, topic, type, deck_id
        disk_id: newDiskRef.id,
        user_id: await firebase.auth().currentUser.uid,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      if (payload.type === "HOLO") disk.holospace_id = "";
      if (payload.type !== "TEXT") disk.children = []; // holds disk presence

      await newDiskRef.set(disk);
      return { success: true, disk };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async addNewDirect({ commit }, payload) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let newDiskRef = await disksRef.doc();
      //   let batch = db.batch();
      //   let subsRef = db.collection("subscriptions");
      //   payload.user_ids.map((user_id) => {
      //     batch.set(subsRef.doc(), {
      //       user_id,
      //       disk_id: newDiskRef.id,
      //       timestamp: serverTimestamp(),
      //     });
      //   });
      //   await batch.commit();
      let disk = {
        id: newDiskRef.id,
        ...payload, // payload: name, topic, type, user_ids
        is_direct: true,
        disk_id: newDiskRef.id,
        user_id: await firebase.auth().currentUser.uid,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      };
      if (payload.type === "HOLO") disk.holospace_id = "";
      if (payload.type !== "TEXT") disk.children = []; // holds disk presence
      await newDiskRef.set(disk);
      return { success: true, disk };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },

  async update({ commit }, disk) {
    commit("CLEAR_ERROR");
    try {
      commit("SET_IS_LOADING", true);
      let ref = await disksRef.doc(disk.id);
      disk.updated_at = serverTimestamp();
      await ref.update(disk);
      return { success: true };
    } catch (error) {
      commit("SET_ERROR", error.message);
      return { success: false, error };
    } finally {
      commit("SET_IS_LOADING", false);
    }
  },
};

const getters = {
  disk: (state) => (state.diskRef.exists ? state.diskRef.data() : {}),
  textDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "TEXT") : [],
  voipDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "VOIP") : [],
  holoDisks: (state) =>
    state.disks ? state.disks.filter((d) => d.type === "HOLO") : [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
