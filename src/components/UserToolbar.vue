<template>
  <v-toolbar flat>
    <Avatar :icon="user.photoUrl" :name="user.displayName" />

    <v-toolbar-title class="mx-3">{{ user.displayName }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-triangle-outline</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
import Avatar from "@/components/Avatar";

export default {
  components: { Avatar },
  computed: mapState("auth", ["user"])
};
</script>

<style>
</style>