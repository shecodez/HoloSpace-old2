<template>
  <v-container fluid>
    <slot></slot>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  beforeMount() {
    this.setShowAppBar(true);
    this.setShowFooter(true);
  },
  methods: mapActions("global", ["setShowAppBar", "setShowFooter"])
};
</script>