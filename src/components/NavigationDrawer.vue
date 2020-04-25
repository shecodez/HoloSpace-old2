<template>
  <v-navigation-drawer v-model="drawer" app floating temporary>
    <v-btn @click="toggleSideDrawerIsOpen" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>

    <div>Navigation Drawer</div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "NavigationDrawer",

  computed: {
    ...mapState("app", ["sideDrawerIsOpen"]),
    drawer: {
      get() {
        return this.sideDrawerIsOpen;
      },
      set(value) {
        if (value !== this.sideDrawerIsOpen) {
          this.setSideDrawerIsOpen(value);
        }
        return value;
      }
    }
  },
  methods: mapActions("app", ["toggleSideDrawerIsOpen", "setSideDrawerIsOpen"])
};
</script>