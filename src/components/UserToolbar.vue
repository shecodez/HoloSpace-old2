<template>
  <v-toolbar class="meta-toolbar" flat>
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <UserAvatar :icon="user.photoUrl" :name="user.displayName" iSize="16" />
        </div>
      </template>

      <StatusList />
    </v-menu>

    <v-toolbar-title class="mx-3">{{ user.displayName }}</v-toolbar-title>
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
import { mapState } from "vuex";
import UserAvatar from "@/components/UserAvatar";
import StatusList from "@/components/StatusList";
import OptionToggleBtns from "@/components/OptionToggleBtns";
import SettingsDialog from "@/components/SettingsDialog";

export default {
  components: { UserAvatar, StatusList, OptionToggleBtns, SettingsDialog },
  computed: mapState("auth", ["user"])
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
