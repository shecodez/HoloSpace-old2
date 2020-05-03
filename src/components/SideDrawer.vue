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
      <DeckToolbar />
    </template>

    <v-expansion-panels :value="openDiskType" accordion multiple flat tile>
      <DiskList type="TEXT" :disks="textDisks" />
      <DiskList type="VOIP" :disks="voipDisks" />
      <DiskList type="HOLO" :disks="holoDisks" />
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import DeckToolbar from "@/components/DeckToolbar";
import DiskList from "@/components/DiskList";

export default {
  name: "SideDrawer",
  components: { DeckToolbar, DiskList },
  data: () => ({}),
  // watch: {
  //   "$route.params.disk_id": function(value) {
  //     this.getDiskById(value);
  //   }
  // },
  computed: {
    ...mapState("app", ["sideDrawerIsOpen"]),
    ...mapGetters("disks", ["textDisks", "voipDisks", "holoDisks"]),
    ...mapGetters("disk", ["disk"]),
    openDiskType() {
      switch (this.disk.type) {
        case "VOIP":
          return [1];
        case "HOLO":
          return [2];
        default:
          return [0];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
