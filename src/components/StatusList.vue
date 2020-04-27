<template>
  <v-list dense>
    <v-list-item-group v-model="status">
      <v-list-item v-for="(item, i) in items" :key="i" @click="setUserStatus(item.name)">
        <v-list-item-icon>
          <v-icon :color="toColor(item.name)" small>{{item.icon || 'mdi-circle'}}</v-icon>
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
import { mapState } from "vuex";
import OptionToggleBtns from "@/components/OptionToggleBtns";
import SettingsDialog from "@/components/SettingsDialog";

export default {
  name: "StatusList",

  components: { OptionToggleBtns, SettingsDialog },
  data: () => ({
    status: null,
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
      { name: "Hide", description: "Invisible" }
    ]
  }),
  props: {
    user: {
      type: Object
    }
  },
  computed: mapState("app", ["metaDrawerIsMini"]),
  methods: {
    toColor(status) {
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
    },
    setUserStatus(value) {
      console.log("StatusList.vue setUserStatus", value);
    }
  }
};
</script>