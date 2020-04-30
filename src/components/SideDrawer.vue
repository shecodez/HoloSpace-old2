<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.mdAndUp"
    color="transparent"
    :mini-variant="!sideDrawerIsOpen"
    mini-variant-width="0"
    floating
    permanent
  >
    <DeckToolbar />

    <!-- <v-expansion-panels :value="[1]" accordion multiple flat tile>
      <DiskList type="TEXT" :disks="getDisksOfType('TEXT')" />
      <DiskList type="VOIP" :disks="getDisksOfType('VOIP')" />
      <DiskList type="HOLO" :disks="getDisksOfType('HOLO')" />
    </v-expansion-panels>-->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import DeckToolbar from "@/components/DeckToolbar";

export default {
  name: "SideDrawer",
  components: { DeckToolbar },
  data: () => ({}),
  computed: mapState("app", ["sideDrawerIsOpen"])
};
</script>

<style>
</style>
