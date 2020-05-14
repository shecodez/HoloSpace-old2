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

    <v-expansion-panels :value="openDiskType" accordion multiple flat tile>
      <DiskList type="TEXT" :disks="textDisks" :isDirect="isDirect" />
      <DiskList type="VOIP" :disks="voipDisks" :isDirect="isDirect" />
      <DiskList type="HOLO" :disks="holoDisks" :isDirect="isDirect" />
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import DeckToolbar from "@/components/DeckToolbar";
import DiskList from "@/components/DiskList";
import SideToolbar from "@/components/SideToolbar";

export default {
  name: "SideDrawer",
  components: { DeckToolbar, DiskList, SideToolbar },
  data: () => ({}),
  mounted() {
    this.initDeckById(this.$route.params.deck_id);
  },
  watch: {
    "$route.params.deck_id": function(value) {
      this.initDeckById(value);
    }
    // "$route.params.disk_id": function(value) {
    //   this.getDiskById(value);
    // },
  },
  computed: {
    ...mapState("app", ["sideDrawerIsOpen"]),
    ...mapGetters("disks", ["textDisks", "voipDisks", "holoDisks"]),
    ...mapGetters("disk", ["disk"]),
    ...mapGetters("deck", ["deck"]),
    isDirect() {
      return this.$route.name.includes("Direct"); // IE .indexOf()
    },
    openDiskType() {
      switch (this.disk.type) {
        case "TEXT":
          return [0];
        case "VOIP":
          return [1];
        case "HOLO":
          return [2];
        default:
          return [];
      }
    }
  },
  methods: mapActions("deck", ["initDeckById"])
};
</script>

<style lang="scss" scoped></style>
