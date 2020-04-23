<template>
  <v-snackbar :color="alertType" :value="showAlert" bottom>
    {{ alertText }}
    <v-btn @click="clearAlert" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState("global", ["alertText", "alertType"]),
    ...mapGetters("global", ["showAlert"])
  },
  methods: mapActions("global", ["clearAlert"])
};
</script>
