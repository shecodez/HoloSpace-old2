<template>
  <v-form v-if="disk.id" ref="form" class="message-form mt-3">
    <v-text-field
      @click:clear="clear"
      @keydown.enter.prevent.stop="submit"
      v-model="text"
      :error-messages="error"
      :label="`Message ${this.disk.name}`"
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
          <v-btn @click="submit" color="primary" icon :loading="isLoading">
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";

import UploadFileDialog from "@/components/chat/UploadFileDialog";

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
      "mdi-emoticon-tongue"
    ]
  }),
  mounted() {
    this.clearError();
  },
  computed: {
    ...mapGetters("disks", ["disk"]),
    ...mapState("chat", ["error", "isLoading"]),
    icon() {
      return this.icons[Math.floor(Math.random() * this.icons.length)];
    }
  },
  methods: {
    ...mapActions("chat", ["clearError", "sendMessage"]),
    async submit() {
      let response;
      if (this.$refs.form.validate()) {
        response = await this.sendMessage({
          text: this.text,
          disk_id: this.$route.params.disk_id
        });
      }
      if (response.success) {
        this.clear();
        this.clearError();
      }
    },
    clear() {
      this.text = "";
    }
  }
};
</script>

<style lang="scss">
.message-form {
  width: 90%;
  margin: auto;
}
@media (max-width: 960px) {
  .message-form {
    width: 95%;
  }
}
.theme--dark.v-text-field--solo {
  .v-input__control > .v-input__slot {
    background: var(--v-background-base);
  }
}
</style>
