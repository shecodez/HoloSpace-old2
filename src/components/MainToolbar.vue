<template>
  <v-toolbar flat style="flex: 0;">
    <v-btn icon @click="toggleSideDrawerIsOpen">
      <v-icon v-if="!sideDrawerIsOpen">mdi-wrap-disabled</v-icon>
      <v-icon v-else class="mdi-rotate-180">mdi-wrap-disabled</v-icon>
    </v-btn>
    <v-toolbar-title v-if="isDirect && !disk.name">@{{ user.displayName }} Captain's log</v-toolbar-title>
    <v-toolbar-title v-else>
      {{ disk.name }}
      <span v-if="disk.topic" class="topic">{{ disk.topic }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <template v-if="$vuetify.breakpoint.mdAndUp">
      <SearchMenu />
      <v-btn icon small tile>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <CalendarDialog />
    </template>
    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import SearchMenu from "@/components/SearchMenu";
import CalendarDialog from "@/components/users/me/CalendarDialog";

export default {
  name: "MainToolbar",

  components: { SearchMenu, CalendarDialog },
  data: () => ({
    contextMenuItems: [
      { text: "SwitchLocale", icon: "mdi-translate" },
      { text: "ToggleTheme", icon: "mdi-brightness-5" }
    ]
  }),
  computed: {
    ...mapState("auth", ["user"]),
    ...mapState("app", ["sideDrawerIsOpen"]),
    ...mapGetters("disks", ["disk"]),
    isDirect() {
      return this.$route.name.includes("Direct"); // IE .indexOf()
    }
  },
  methods: mapActions("app", ["toggleSideDrawerIsOpen"])
};
</script>

<style lang="scss" scoped>
.theme--dark {
  &.v-toolbar {
    background: var(--v-background-base);
  }
}
.topic {
  font-weight: 100 !important;
  border-left: 1px solid grey; // var(--v-secondary-text-color)
  padding-left: 4px;
}
</style>
