<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.mdAndUp"
    color="transparent"
    :mini-variant="!sideDrawerIsOpen"
    mini-variant-width="0"
    floating
    permanent
  >
    <template v-slot:prepend>
      <SideToolbar v-if="isDirect" title="Direct Messages" />
      <DeckToolbar v-else :deck="deck" />
    </template>

    <v-expansion-panels :value="expandedPanels" accordion multiple flat tile>
      <DiskList type="TEXT" :disks="textDisks" />
      <DiskList type="VOIP" :disks="voipDisks" />
      <DiskList type="HOLO" :disks="holoDisks" />
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import DeckToolbar from "@/components/decks/DeckToolbar";
import DiskList from "@/components/disks/DiskList";
import SideToolbar from "@/components/SideToolbar";

export default {
  name: "SideDrawer",
  components: { DeckToolbar, DiskList, SideToolbar },
  data: () => ({
    expandedPanels: [],
    typeMap: { TEXT: 0, VOIP: 1, HOLO: 2 }
  }),
  watch: {
    "disk.type": function(val) {
      if (val !== undefined) {
        this.expandedPanels = [this.typeMap[val]];
      }
    }
  },
  computed: {
    ...mapState("app", ["sideDrawerIsOpen"]),
    ...mapGetters("disks", ["disk", "textDisks", "voipDisks", "holoDisks"]),
    ...mapGetters("decks", ["deck"]),
    isDirect() {
      return this.$route.name.includes("Direct"); // IE .indexOf()
    }
  }
};
</script>

<style lang="scss" scoped></style>
