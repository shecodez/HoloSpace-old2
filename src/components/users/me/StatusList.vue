<template>
  <v-list dense>
    <v-list-item-group v-model="status" mandatory>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon :color="getStatusColor(item.name)" small>{{ item.icon || "mdi-circle" }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
          <v-list-item-subtitle v-text="item.description" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>

    <template v-if="metaDrawerIsMini">
      <v-list-item>
        <v-list-item-content>
          <OptionToggleBtns />
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="justify-center">
        <SettingsDialog />
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapState, mapActions } from "vuex";

import OptionToggleBtns from "@/components/users/me/OptionToggleBtns";
import SettingsDialog from "@/components/users/me/SettingsDialog";

export default {
  name: "StatusList",

  components: { OptionToggleBtns, SettingsDialog },
  data: () => ({
    items: [
      { name: "Show", description: "Available", icon: "mdi-check-circle" },
      { name: "Away" },
      { name: "BRB", description: "Be Right Back", icon: "mdi-clock" },
      { name: "Busy" },
      {
        name: "DND",
        description: "Do NOT Disturb",
        icon: "mdi-minus-circle"
      },
      {
        name: "Hide",
        description: "Invisible",
        icon: "mdi-close-circle-outline"
      }
    ]
  }),
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    ...mapState("app", ["metaDrawerIsMini"]),
    status: {
      get() {
        return this.items.findIndex(
          s => s.name.toUpperCase() === this.user.status.toUpperCase()
        );
      },
      set(i) {
        if (i) {
          const NEW_STATUS = this.items[i].name.toUpperCase();
          this.setMyStatus(NEW_STATUS);
          this.$emit("closeMenu");
        }
      }
    }
  },
  methods: {
    ...mapActions("me", ["setMyStatus"]),
    getStatusColor(status) {
      switch (status.toLowerCase()) {
        case "away":
        case "brb":
          return "warning";
        case "busy":
        case "dnd":
          return "error";
        case "show":
          return "success";
        default:
          return "grey";
      }
    }
  }
};
</script>
