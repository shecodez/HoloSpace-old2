<template>
  <v-container fluid>
    <slot></slot>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DefaultLayout",

  beforeMount() {
    this.setShowAppBar(true);
    this.setShowFooter(true);
  },
  methods: {
    ...mapActions("app", ["setShowAppBar", "setShowFooter"]),
    ...mapActions("decks", ["init"])
  }
};
</script>
