<template>
  <v-snackbar v-model="snackbar" :color="alertType" bottom>
    {{ alertText }}
    <v-btn @click="clearAlert" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Snackbar",

  computed: {
    ...mapState("app", ["alertText", "alertType"]),
    ...mapGetters("app", ["showAlert"]),
    snackbar: {
      get() {
        return this.showAlert;
      },
      set(value) {
        if (value === false) {
          this.clearAlert();
        }
        return value;
      }
    }
  },
  methods: mapActions("app", ["clearAlert"])
};
</script>
