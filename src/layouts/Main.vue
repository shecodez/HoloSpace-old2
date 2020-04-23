<template>
  <v-container fluid>
    <slot></slot>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  beforeMount() {
    this.setShowAppBar(false);
    this.setShowFooter(false);
  },
  methods: mapActions("global", ["setShowAppBar", "setShowFooter"])
};
</script>