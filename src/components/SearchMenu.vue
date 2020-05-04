<template>
  <v-menu v-model="menu" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn icon small tile v-on="on">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </template>

    <v-toolbar dense>
      <v-form ref="form">
        <v-text-field v-model="q" clearable hide-details prepend-icon="mdi-magnify" single-line></v-text-field>
      </v-form>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "SearchMenu",

  data: () => ({
    menu: false,
    q: ""
  }),
  //computed: mapState("chat", ["query"]),
  methods: mapActions("chat", ["setQuery", "clearQuery"]),
  watch: {
    q(value) {
      this.setQuery(value);
    }
  }
};
</script>

<style>
</style>