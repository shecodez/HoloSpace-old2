<template>
  <div class="root d-flex flex-md-column">
    <v-btn :to="routeBtn.link" class="primary ma-2" fab>
      <v-icon>{{ routeBtn.icon }}</v-icon>
    </v-btn>

    <v-divider class="ma-3 hidden-sm-and-down"></v-divider>
    <v-divider class="ma-3 hidden-md-and-up" vertical></v-divider>

    <v-subheader class="overline">Decks</v-subheader>

    <div class="decks d-flex d-md-block">
      <div v-for="deck in decks" :key="deck.id" class="deck pa-2">
        <v-tooltip :bottom="smAndDown" :right="!smAndDown">
          <template v-slot:activator="{ on }">
            <div v-on="on" :class="setActive(deck.id)">
              <router-link :to="`/d/${deck.id}/${deck.disk_id}`">
                <Avatar :icon="deck.iconUrl" :name="deck.name" size="56" />
              </router-link>
            </div>
          </template>
          <span>{{ deck.name }}</span>
        </v-tooltip>
      </div>
    </div>

    <AddOrJoinDialog />
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
import AddOrJoinDialog from "@/components/decks/AddOrJoinDialog";

export default {
  name: "DeckList",

  components: { Avatar, AddOrJoinDialog },
  props: {
    decks: {
      type: Array
    }
  },
  data: () => ({}),
  computed: {
    currentDeckId() {
      return this.$route.params.deck_id;
    },
    routeBtn() {
      const IS_DIRECT = this.$route.name.includes("Direct"); // IE .indexOf()
      return IS_DIRECT
        ? { icon: "mdi-at", link: "/@me" } // mdi-mail-ru
        : { icon: "mdi-email", link: "/direct" };
    },
    smAndDown() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return true;
        default:
          return false;
      }
    }
  },
  methods: {
    setActive(id) {
      if (id === this.currentDeckId) {
        return "deck--active";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.root {
  min-height: 100%;
  max-height: 100%;
  //align-items: center;
}
.decks,
.v-btn,
.v-subheader {
  align-self: center;
}
.decks {
  overflow-y: auto;
  overflow-x: hidden;
}
@media (max-width: 960px) {
  .decks {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
.deck--active {
  .v-avatar {
    border-radius: 10%;
    &:hover {
      animation: none;
    }
  }
}
.v-avatar:hover {
  border-radius: 10%;
  animation: borders 0.5s ease-in-out;
}
@keyframes borders {
  0% {
    border-radius: 50%;
  }
  33% {
    border-radius: 15%;
  }
  66% {
    border-radius: 25%;
  }
  100% {
    border-radius: 10%;
  }
}
</style>
