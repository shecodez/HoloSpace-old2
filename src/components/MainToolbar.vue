<template>
  <v-toolbar flat style="flex: 0;">
    <v-btn icon @click="toggleSideDrawerIsOpen">
      <v-icon v-if="!sideDrawerIsOpen">mdi-wrap-disabled</v-icon>
      <v-icon v-else class="mdi-rotate-180">mdi-wrap-disabled</v-icon>
    </v-btn>
    <v-toolbar-title>
      {{ disk.name }}
      <span
        v-if="disk.topic"
        class="topic"
      >{{ disk.topic }}ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt</span>
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
import { mapActions, mapState, mapGetters } from "vuex";
import ThemeToggleBtn from "@/components/ToggleThemeBtn";

export default {
  name: "MainToolbar",

  components: { ThemeToggleBtn },
  data: () => ({}),
  mounted() {
    this.getDiskById(this.$route.params.disk_id);
  },
  watch: {
    "$route.params.disk_id": function(value) {
      this.getDiskById(value);
    }
  },
  computed: {
    ...mapState("app", ["sideDrawerIsOpen"]),
    ...mapGetters("disk", ["disk"])
  },
  methods: {
    ...mapActions("app", ["toggleSideDrawerIsOpen"]),
    ...mapActions("disk", ["getDiskById"])
  }
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