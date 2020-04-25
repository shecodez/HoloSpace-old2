<template>
  <v-btn icon @click="toggleTheme">
    <v-icon v-if="isDark">mdi-brightness-5</v-icon>
    <v-icon v-else>mdi-weather-night</v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  created() {
    this.$vuetify.theme.dark = this.isDark;
  },
  computed: mapState("app", ["isDark"]),
  methods: mapActions("app", ["toggleTheme"]),
  watch: {
    isDark(value) {
      this.$vuetify.theme.dark = value;
    }
  }
};
</script>
