<template>
  <v-sheet tile>
    <v-alert v-model="alert" :type="bannerType" border="left" class="mb-0" dismissible text tile>
      <v-row align="center">
        <v-col class="grow py-0">{{ bannerText }}</v-col>
        <v-col v-if="isBannerAction" class="shrink py-0">
          <v-btn @click="bannerActionFunc">{{ bannerActionText }}</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-sheet>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "Banner",

  computed: {
    ...mapState("app", [
      "bannerText",
      "bannerType",
      "bannerActionFunc",
      "bannerActionText"
    ]),
    ...mapGetters("app", ["showBanner", "isBannerAction"]),
    alert: {
      get() {
        return this.showBanner;
      },
      set(isOpen) {
        if (isOpen === false) {
          this.clearBanner();
        }
        return isOpen;
      }
    },
    icon() {
      switch (this.bannerType) {
        case "success":
          return "mdi-checkbox-marked";
        case "info":
          return "mdi-information";
        case "warning":
          return "mdi-alert";
        case "error":
          return "mdi-close-octagon";
        default:
          return "mdi-cube-outline";
      }
    }
  },
  methods: {
    ...mapActions("app", ["clearBanner"]),
    onClose() {
      this.clearBanner();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-alert {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-top: 28px solid transparent;
    border-bottom: 28px solid transparent;
    border-right: 28px solid transparent;
    // TODO: make this the color of the left-border
    border-right-color: inherit;
  }
}
</style>
