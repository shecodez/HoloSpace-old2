<template>
  <v-toolbar class="meta-toolbar" flat>
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ on }">
        <div v-on="on">
          <UserAvatar :user="me" iSize="16" />
        </div>
      </template>

      <StatusList :user="me" />
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
import { mapGetters, mapActions } from "vuex";
import UserAvatar from "@/components/UserAvatar";
import StatusList from "@/components/StatusList";
import OptionToggleBtns from "@/components/OptionToggleBtns";
import SettingsDialog from "@/components/SettingsDialog";

export default {
  components: { UserAvatar, StatusList, OptionToggleBtns, SettingsDialog },
  mounted() {
    this.initUserById();
  },
  computed: mapGetters("user", ["me"]),

  methods: mapActions("user", ["initUserById"])
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
