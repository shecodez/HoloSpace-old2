<template>
  <v-toolbar class="meta-toolbar" flat>
    <v-menu v-model="menu" :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <UserAvatar :user="me" iSize="16" />
        </div>
      </template>

      <StatusList :user="me" @closeMenu="menu = !menu" />
    </v-menu>

    <v-toolbar-title class="mx-3">{{ me.name }}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu open-on-hover :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>
      </template>
      <OptionToggleBtns />
    </v-menu>
    <SettingsDialog />
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";

import UserAvatar from "@/components/users/UserAvatar";
import StatusList from "@/components/users/me/StatusList";
import OptionToggleBtns from "@/components/users/me/OptionToggleBtns";
import SettingsDialog from "@/components/users/me/SettingsDialog";

export default {
  components: { UserAvatar, StatusList, OptionToggleBtns, SettingsDialog },
  data: () => ({
    menu: false
  }),
  computed: mapGetters("me", ["me"])
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.theme--dark {
  .meta-toolbar {
    background-color: $dark-2;
  }
}
.theme--light {
  .meta-toolbar {
    background-color: $light-2;
  }
}
</style>
