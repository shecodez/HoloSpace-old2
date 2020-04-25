<template>
  <v-container fluid fill-height ma-0 pa-0>
    <v-img :src="bgImg" :gradient="bgGradient">
      <v-row no-gutters class="flex-col" :class="{ 'flex-nowrap': $vuetify.breakpoint.mdAndUp}">
        <v-col class="fixed" cols="12" md="auto">
          <v-card class="deck-c" tile style="min-width: 80px;">
            <DeckList :decks="decks" />
          </v-card>
        </v-col>

        <v-col class="flex-1 d-flex flex-column">
          <Banner type="info" text="This is an info banner." />

          <v-row class="flex-nowrap no-overflow" no-gutters>
            <v-col class="flex-grow-0 flex-shrink-1" cols="auto">
              <v-card class="side-c" tile>
                <SideDrawer />
              </v-card>
            </v-col>

            <v-col>
              <v-card class="main-c" tile>
                <MainToolbar />
                <slot></slot>
              </v-card>
            </v-col>

            <v-col class="flex-grow-0 flex-shrink-0" cols="auto">
              <v-card class="meta-c" tile>
                <MetaDrawer />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Banner from "@/components/Banner.vue";
import DeckList from "@/components/DeckList.vue";
import MainToolbar from "@/components/MainToolbar.vue";
import MetaDrawer from "@/components/MetaDrawer.vue";
import SideDrawer from "@/components/SideDrawer.vue";

export default {
  components: { Banner, DeckList, MainToolbar, MetaDrawer, SideDrawer },
  data: () => ({
    bgImg: require("@/assets/flat-mountains-1080p.jpg"),
    bgGradient: "90deg, rgba(255, 77, 77, 0.6) 10%, rgba(255, 129, 131, 0.6)"
  }),
  beforeMount() {
    this.setShowAppBar(false);
    this.setShowFooter(false);
  },
  mounted() {
    this.init();
  },
  computed: mapState("decks", ["decks"]),
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
    }
  },
  methods: {
    ...mapActions("app", [
      "setShowAppBar",
      "setShowFooter",
      "setSideDrawerIsOpen",
      "setMetaDrawerIsMini"
    ]),
    ...mapActions("decks", ["init"])
  }
};
</script>

<style lang="scss" scoped>
$alpha: 0.8;

$dark-1: #111111;
$dark-2: #212121;
$dark-3: #303030;
$dark-4: #424242;

$light-1: #fafafa;
$light-2: #bdbdbd;
$light-3: #e0e0e0;
$light-4: #eeeeee;

.v-card {
  height: 100%;
  box-shadow: none;
}
.flex-col {
  height: 100vh;
  width: 100vw;
  max-width: 100vw;
}
@media (max-width: 960px) {
  .fixed {
    max-height: 80px;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .flex-1 {
    flex: 1;
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