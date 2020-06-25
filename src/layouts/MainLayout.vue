<template>
  <v-container fluid fill-height ma-0 pa-0>
    <v-img :src="bgImg" :gradient="bgGradient">
      <v-row no-gutters class="wrapper" :class="{ 'flex-nowrap': $vuetify.breakpoint.mdAndUp }">
        <v-col class="fixed" cols="12" md="auto">
          <v-card class="deck-c" tile style="min-width: 80px;">
            <DeckList :decks="decks" />
          </v-card>
        </v-col>

        <v-col class="flex-1 d-flex flex-column">
          <Banner v-if="showBanner" />

          <v-row class="flex-nowrap no-overflow" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-1" cols="auto">
              <v-card class="side-c" tile>
                <SideDrawer />
              </v-card>
            </v-col>

            <v-col cols="1" class="main-col flex-grow-1 flex-shrink-0">
              <v-card class="main-c d-flex flex-column" tile>
                <MainToolbar />

                <slot></slot>
              </v-card>
            </v-col>

            <v-col class="flex-grow-0 flex-shrink-0" cols="auto">
              <v-card class="meta-c" tile>
                <MetaDrawer :users="users" :me="me" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import Banner from "@/components/Banner.vue";
import DeckList from "@/components/decks/DeckList";
import MainToolbar from "@/components/MainToolbar.vue";
import MetaDrawer from "@/components/MetaDrawer.vue";
import SideDrawer from "@/components/SideDrawer.vue";

export default {
  components: { Banner, DeckList, MainToolbar, MetaDrawer, SideDrawer },
  props: {
    users: {
      type: Array,
      default: () => []
    },
    page: {
      type: String
    }
  },
  data: () => ({
    bgImg: require("@/assets/flat-mountains-1080p.jpg"),
    bgGradient: "90deg, rgba(255, 77, 77, 0.6) 10%, rgba(255, 129, 131, 0.6)",
    bgGradientLight:
      "to top right, rgba(19, 84, 122, 0.5), rgba(128, 208, 199, 0.8)"
  }),
  beforeMount() {
    this.setShowAppBar(false);
    this.setShowFooter(false);
  },
  created() {
    this.getDecksByUid();
    this.getDeckById(this.$route.params.deck_id);
    this.getDisksByDeckId(this.$route.params.deck_id);
    this.getDiskById(this.$route.params.disk_id);
    this.getMeByUid();
  },
  mounted() {
    if (this.user && !this.user.emailVerified) {
      this.setBanner({
        type: "warning",
        text: "Please verify your email address."
      });
    }
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("app", ["showBanner"]),
    ...mapState("decks", ["decks"]),
    ...mapGetters("me", ["me"])
  },
  watch: {
    "$vuetify.breakpoint.name": function(value) {
      switch (value) {
        case "xs":
        case "sm":
          this.setSideDrawerIsOpen(false);
          this.setMetaDrawerIsMini(true);
          break;
        default:
          this.setSideDrawerIsOpen(true);
          this.setMetaDrawerIsMini(false);
          break;
      }
    },
    "$route.params.deck_id": function(value) {
      this.getDisksByDeckId(value);
      this.getDeckById(value);
    },
    "$route.params.disk_id": function(value) {
      this.getDiskById(value);
    }
  },
  methods: {
    ...mapActions("app", [
      "setShowAppBar",
      "setShowFooter",
      "setSideDrawerIsOpen",
      "setMetaDrawerIsMini",
      "setPage",
      "setBanner"
    ]),
    ...mapActions("decks", ["getDecksByUid", "getDeckById"]),
    ...mapActions("disks", ["getDisksByDeckId", "getDiskById"]),
    ...mapActions("me", ["getMeByUid"])
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.v-card {
  height: 100%;
  box-shadow: none;
}
.wrapper {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
}
.flex-1 {
  flex: 1;
  min-height: 0;
  max-width: calc(100vw - 80px);
}
.no-overflow {
  overflow: hidden;
}
.main-col {
  min-width: 100px;
  max-width: 100%;
}
.flex-col {
  display: flex;
  flex-direction: column;
}
@media (max-width: 960px) {
  .fixed {
    max-height: 72px;
  }
  .flex-1 {
    max-height: calc(100vh - 72px);
    max-width: 100vw;
  }
}

.theme--dark {
  .deck-c {
    background-color: rgba($dark-1, $alpha);
  }
  .side-c {
    background-color: rgba($dark-3, $alpha);
  }
  .main-c {
    background-color: rgba($dark-4, $alpha);
  }
  .meta-c {
    background-color: rgba($dark-2, $alpha);
  }
}
.theme--light {
  .deck-c {
    background-color: rgba($light-1, $alpha);
  }
  .side-c {
    background-color: rgba($light-3, $alpha);
  }
  .main-c {
    background-color: rgba($light-4, $alpha);
  }
  .meta-c {
    background-color: rgba($light-2, $alpha);
  }
}
</style>
