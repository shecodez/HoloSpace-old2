<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon small v-on="on">
        <v-icon v-if="!data">mdi-plus</v-icon>
        <v-icon v-else>mdi-playlist-edit</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="primary--text">{{ label }} Disk: {{ type }}</v-card-title>

      <v-card-text>
        <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="disk.name" label="Name" :rules="r.name"></v-text-field>
          <v-textarea v-model="disk.topic" label="Topic (optional)" :rules="r.topic" :counter="255"></v-textarea>
          <!-- <v-select v-model="disk.type" :items="items" :rules="r.type" label="Type"></v-select> -->
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" class="primary" :loading="isLoading">{{ label }} Disk</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "DiskFormDialog",
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      default: "TEXT"
    }
  },
  data: () => ({
    dialog: false,
    disk: {
      name: "",
      topic: "",
      type: null // this.type
    },
    items: ["TEXT", "VOIP", "HOLO"],
    valid: true,
    r: {
      name: [
        v => !!v || "Name is required",
        v => (v && v.length < 64) || "Name cannot be longer than 64 characters"
      ],
      topic: [
        v =>
          (v && v.length < 255) || "Topic cannot be longer than 255 characters"
      ],
      type: [v => !!v || "Type is required"]
    }
  }),
  mounted() {
    this.clearError();
  },
  computed: {
    ...mapState("disk", ["error", "isLoading"]),
    label() {
      return this.data ? "Edit" : "Add";
    }
  },
  methods: {
    ...mapActions("disk", ["clearError", "createDisk"]),
    ...mapActions("app", ["setAlert"]),
    async submit() {
      if (this.$refs.form.validate()) {
        let result;
        if (this.data) {
          //result = await this.updateDisk(this.disk);
        } else {
          result = await this.createDisk({
            ...this.disk,
            deck_id: this.$route.params.deck_id,
            type: this.type
          });
        }
        if (result) {
          this.setAlert({
            type: "success",
            text: `${result.name} Disk successfully created.`
          });
          // TODO: add action (link) to alert :
          // <router-link :to="`/d/${result.deck_id}/${result.id}`">Open Disk</router-link>
          this.cancel();
        }
      }
    },
    cancel() {
      this.clearError();
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>