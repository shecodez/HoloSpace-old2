<template>
  <v-app-bar app color="rgba(0, 0, 0, 0)" flat>
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
      <router-link to="/chat" class="mr-2">Open App</router-link>
      <v-btn @click="logout" text>Logout</v-btn>
    </span>
    <span v-else>
      <router-link to="/login" class="mr-2">Login</router-link>
    </span>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Header",

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
