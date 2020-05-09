//import { firestoreAction } from "vuexfire";
import mime from "mime-types";
import shortid from "shortid";
import firebase from "@/plugins/firebase";
//import db from "@/plugins/firestore";

const STORAGE_REF = firebase.storage().ref();

const state = {
  isLoading: false,
  error: null,
  progress: null,
};

const mutations = {
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setIsLoading(state, payload) {
    state.loading = payload;
  },
  setProgress(state, payload) {
    state.progress = payload;
  },
};

const actions = {
  uploadFile({ commit }, payload) {
    commit("clearError");
    commit("setIsLoading", true);
    commit("setProgress", 0);

    let metadata = { contentType: mime.lookup(payload.name) };
    // TODO: group uploads by ext i.e. png,jpeg,bmp > .child(`images/${payload.filename}`)
    const FILE_PATH = `${shortid.generate()}-${payload.name}`;
    let uploadTask = STORAGE_REF.child(FILE_PATH).put(payload, metadata);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          commit("setProgress", progress);
        },
        (err) => {
          commit("setError", err.code);
          commit("setIsLoading", false);
          reject({ error: true });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            resolve({ error: false, downloadURL });
          });
          commit("setIsLoading", false);
        }
      );
    });
  },

  clearError({ commit }) {
    commit("clearError");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
