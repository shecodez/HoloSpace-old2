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

        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>
    </template>

    <UserList class="on-deck" :users="usersOnDeck" on />
    <UserList class="offline" :users="usersOffline" />

    <template v-slot:append>
      <UserToolbar />
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from "vuex";

import UserToolbar from "@/components/UserToolbar.vue";
import UserList from "@/components/UserList.vue";

export default {
  name: "MetaDrawer",
  components: { UserToolbar, UserList },
  props: {
    title: {
      type: String
    },
    users: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({}),
  computed: {
    ...mapState("app", ["metaDrawerIsMini"]),

    usersOnDeck() {
      return this.users.filter(
        user => user.is_online && user.status !== "HIDE"
      );
    },
    usersOffline() {
      return this.users.filter(
        user => !user.is_online || user.status === "HIDE"
      );
    }
  },
  methods: mapActions("app", ["toggleMetaDrawerIsMini"])
};
</script>

<style lang="scss" scoped>
</style>