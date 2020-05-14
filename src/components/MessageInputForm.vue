<template>
  <v-form v-if="disk.id" ref="form" style="width: 100%;">
    <v-text-field
      @click:clear="clear"
      @keydown.enter.prevent.stop="submit"
      v-model="text"
      :error-messages="error"
      :label="label"
      autocomplete="off"
      clearable
      required
      solo
    >
      <template v-slot:prepend-inner>
        <UploadFileDialog />
      </template>

      <template v-slot:append>
        <v-row class="py-2 flex-nowrap" no-gutters>
          <v-btn icon>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
          <v-divider inset vertical></v-divider>
          <v-btn @click="submit" color="primary" icon :loading="loading">
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import UploadFileDialog from "@/components/UploadFileDialog";

export default {
  name: "MessageInputForm",

  components: { UploadFileDialog },
  data: () => ({
    text: "",
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),
  mounted() {
    this.clearError();
  },
  computed: {
    ...mapGetters("disk", ["disk"]),
    ...mapState("chat", ["error", "loading"]),
    label() {
      const H = this.disk.type === "TEXT" ? "#" : "";
      return `Message ${H}${this.disk.name}`;
    },
    icon() {
      return this.icons[Math.floor(Math.random() * this.icons.length)];
    },
  },
  methods: {
    ...mapActions("chat", ["clearError", "createMessage"]),
    async submit() {
      let response;
      if (this.$refs.form.validate()) {
        if (this.data) {
          // response = await this.updateMessage(this.disk);
        } else {
          response = await this.createMessage({
            text: this.text,
            disk_id: this.$route.params.disk_id,
          });
        }
      }
      if (!response.error) {
        this.clear();
        this.clearError();
      }
    },
    clear() {
      this.text = "";
    },
  },
};
</script>

<style lang="scss">
.theme--dark.v-text-field--solo {
  .v-input__control > .v-input__slot {
    background: var(--v-background-base);
  }
}
</style>
