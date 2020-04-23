<template>
  <v-btn icon @click="toggleTheme">
    <v-icon v-if="isDark">mdi-brightness-5</v-icon>
    <v-icon v-else>mdi-brightness-4</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.$vuetify.theme.dark = this.isDark;
  },
  computed: mapState("global", ["isDark"]),
  methods: mapActions("global", ["toggleTheme"]),
  watch: {
    isDark(value) {
      this.$vuetify.theme.dark = value;
    }
  }
};
</script>
