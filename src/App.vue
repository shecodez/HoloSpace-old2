<template>
  <v-app>
    <NavigationDrawer v-if="$vuetify.breakpoint.smAndDown" />
    <AppBar :show="showAppBar" />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer :show="showFooter" />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import AppBar from "@/components/AppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Footer from "@/components/Footer.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "App",

  components: {
    AppBar,
    NavigationDrawer,
    Footer,
    Snackbar
  },

  data: () => ({}),
  computed: mapState("app", ["showAppBar", "showFooter"])
};
</script>

<style lang="scss">
//@import url("https://fonts.googleapis.com/css?family=Roboto");

*,
*:before,
*:after {
  box-sizing: border-box;
}
html {
  overflow-y: hidden !important;
}
</style>
