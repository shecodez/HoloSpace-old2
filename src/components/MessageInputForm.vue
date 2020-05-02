<template>
  <v-form ref="form" style="width: 100%;">
    <v-text-field v-model="text" :label="label" clearable solo>
      <template v-slot:prepend-inner>
        <v-btn icon>
          <v-icon>mdi-upload-outline</v-icon>
        </v-btn>
      </template>

      <template v-slot:append>
        <v-row class="py-2 flex-nowrap" no-gutters>
          <v-btn icon>
            <v-icon>{{ icon }}</v-icon>
          </v-btn>
          <v-divider inset vertical></v-divider>
          <v-btn icon color="primary">
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-text-field>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MessageInputForm",

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

  computed: {
    ...mapGetters("disk", ["disk"]),
    label() {
      const H = this.disk.type === "TEXT" ? "#" : "";
      return `Message ${H}${this.disk.name}`;
    },
    icon() {
      return this.icons[Math.floor(Math.random() * this.icons.length)];
    }
  }
};
</script>

<style lang="scss" >
.theme--dark.v-text-field--solo {
  .v-input__control > .v-input__slot {
    background: var(--v-background-base);
  }
}
</style>