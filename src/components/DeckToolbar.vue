<template>
  <v-toolbar class="side-toolbar" flat>
    <v-toolbar-title>{{deck.name}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" @click="item.action">{{ item.title }}</v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    items: [
      { title: "Option 1", action: "" },
      { title: "Option 2", action: "" }
    ]
  }),
  mounted() {
    this.initDeckById(this.$route.params.deck_id);
  },
  watch: {
    "$route.params.deck_id": function(value) {
      this.initDeckById(value);
    }
  },
  computed: mapGetters("deck", ["deck"]),
  methods: mapActions("deck", ["initDeckById"])
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.theme--dark {
  .side-toolbar {
    background-color: $dark-3;
  }
}
.theme--light {
  .side-toolbar {
    background-color: $light-3;
  }
}
</style>
