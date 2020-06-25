<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn block color="secondary" v-on="on">Join a Deck</v-btn>
    </template>

    <v-card>
      <v-card-title class="secondary--text text-uppercase">Join your Crew</v-card-title>
      <v-card-subtitle>Enter an access code to join an existing Deck. Your access code should look something like this:</v-card-subtitle>

      <v-card-text class="text-center">
        <p class="secondary--text">
          https://holospace-app.com/join/H6x35a
          <span class="grey--text d-block">or</span>
          https://holospace-app.com/shh/Ya$kh2
        </p>

        <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="accessCode" label="Access Code" :rules="r.accessCode" outlined></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="dialog = false">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" class="secondary" :loading="loading">Join</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
//import { mapState } from "vuex";

export default {
  name: "DeckFormDialog",

  data: () => ({
    dialog: false,
    accessCode: "",
    valid: true,
    r: {
      accessCode: [
        v => !!v || "Access Code is required"
        //v => /.+@.+\..+/.test(v) || "Access code must be valid"
      ]
    },
    error: null,
    loading: false
  }),
  mounted() {
    // this.$store.dispatch("membership/clearError");
  },
  //computed: mapState("membership", ["error", "loading"]),
  methods: {
    submit: function() {
      if (this.$refs.form.validate()) {
        // this.$store.dispatch("membership/create", {
        //   accessCode: this.accessCode,
        // });
        console.log("join deck", this.accessCode);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>