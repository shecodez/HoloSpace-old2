<template>
  <v-app-bar app color="rgba(0, 0, 0, 0)" flat :value="show">
    <div class="d-flex align-center">
      <v-img
        alt="HoloSpace Logo"
        class="shrink mr-2"
        contain
        :src="require('../assets/logo_cube.png')"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="HoloSpace Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        :src="require('../assets/logo_text.png')"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>
    <span v-if="isLoggedIn">
      <v-btn to="/chat" outlined rounded>Open App</v-btn>
      <v-btn @click="logout" text>Logout</v-btn>
    </span>
    <span v-else>
      <v-btn to="/login" outlined rounded>Login</v-btn>
    </span>
    <ToggleThemeBtn />
    <LocalSelect />
  </v-app-bar>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import ToggleThemeBtn from "@/components/ToggleThemeBtn";
import LocalSelect from "@/components/LocalSelect";

export default {
  name: "AppBar",

  components: { ToggleThemeBtn, LocalSelect },
  props: ["show"],
  data: () => ({}),
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isLoggedIn"])
  },
  methods: mapActions("auth", ["logout"]),
  watch: {
    isLoggedIn(loggedIn) {
      if (!loggedIn) {
        this.$router.push("/login");
      }
    }
  }
};
</script>
