<template>
  <v-toolbar flat style="flex: 0;">
    <v-btn icon @click="toggleSideDrawerIsOpen">
      <v-icon v-if="!sideDrawerIsOpen">mdi-wrap-disabled</v-icon>
      <v-icon v-else class="mdi-rotate-180">mdi-wrap-disabled</v-icon>
    </v-btn>
    <v-toolbar-title>
      {Disk Name}
      <span class="font-weight-light">| {Disk topic}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-btn icon small tile>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon small tile>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <!-- <CalendarDialog /> -->
      <ThemeToggleBtn />
    </template>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ThemeToggleBtn from "@/components/ToggleThemeBtn";

export default {
  name: "MainToolbar",
  components: { ThemeToggleBtn },
  computed: mapState("app", ["sideDrawerIsOpen"]),
  methods: mapActions("app", ["toggleSideDrawerIsOpen"])
};
</script>

<style lang="scss" scoped>
.theme--dark {
  &.v-toolbar {
    background: var(--v-background-base);
  }
}
</style>