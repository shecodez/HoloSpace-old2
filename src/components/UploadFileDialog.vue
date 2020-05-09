<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-paperclip</v-icon>
      </v-btn>
    </template>

    <v-card>
      <!-- TODO: allow Upload File not just media -->
      <v-card-title class="primary--text text-uppercase">
        Upload Media
      </v-card-title>

      <v-card-text>
        <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

        <v-file-input
          v-model="files"
          accept="image/png, image/jpeg, image/bmp"
          label="File input"
          :rules="rules"
          show-size
        ></v-file-input>

        <div v-if="progress">
          <v-progress-linear :value="percentUploaded"></v-progress-linear>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" class="primary" :loading="isLoading"
          >Upload</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "UploadFileDialog",

  data: () => ({
    dialog: false,
    files: [],
    rules: [
      (v) => !v || v.size < 5000000 || "File size should be less than 5 MB!",
    ],
  }),
  computed: {
    ...mapState("file", ["error", "isLoading", "progress"]),
    percentUploaded() {
      return Math.round(this.progress);
    },
  },
  mounted() {
    this.clearError();
  },
  methods: {
    ...mapActions("file", ["clearError", "uploadFile"]),
    ...mapActions("chat", ["createMessage"]),
    async submit() {
      let uploadResponse = await this.uploadFile(this.files);
      let messageResponse;
      if (!uploadResponse.error) {
        messageResponse = await this.createMessage({
          media: uploadResponse.downloadURL,
          disk_id: this.$route.params.disk_id,
        });
      }
      if (!messageResponse.error) {
        this.cancel();
      }
    },
    cancel() {
      this.clearError();
      this.files = [];
      this.dialog = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
