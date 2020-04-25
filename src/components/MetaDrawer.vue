<template>
  <v-navigation-drawer
    color="transparent"
    :mini-variant="metaDrawerIsMini"
    mini-variant-width="80"
    disable-route-watcher
    floating
    permanent
  >
    <template v-slot:prepend>
      <v-toolbar color="transparent" flat>
        <v-btn icon @click="toggleMetaDrawerIsMini">
          <v-icon v-if="!metaDrawerIsMini">mdi-wrap-disabled</v-icon>
          <v-icon v-else class="mdi-rotate-180">mdi-wrap-disabled</v-icon>
        </v-btn>

        <v-toolbar-title>Crew</v-toolbar-title>
      </v-toolbar>
    </template>

    <!-- <UserList on :users="usersOnDeck" />
    <UserList :users="usersOffline" />-->
    deck crew (members)
    <template v-slot:append>
      <UserToolbar />
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserToolbar from "@/components/UserToolbar.vue";

export default {
  name: "MetaDrawer",
  components: { UserToolbar },
  data: () => ({}),
  computed: mapState("app", ["metaDrawerIsMini"]),
  methods: mapActions("app", ["toggleMetaDrawerIsMini"])
};
</script>

<style>
</style>