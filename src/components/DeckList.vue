<template>
  <div class="root d-flex flex-md-column">
    <v-btn class="primary ma-2" fab>
      <v-icon>mdi-email</v-icon>
    </v-btn>

    <v-divider class="ma-3 hidden-sm-and-down"></v-divider>
    <v-divider class="ma-3 hidden-md-and-up" vertical></v-divider>

    <v-subheader>DECKS</v-subheader>

    <div class="decks d-flex d-md-block">
      <div v-for="deck in decks" :key="deck.name" class="deck pa-2">
        <v-tooltip :bottom="smAndDown" :right="!smAndDown">
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <Avatar :icon="deck.iconUrl" :name="deck.name" size="56" />
            </div>
          </template>
          <span>{{ deck.name }}</span>
        </v-tooltip>
      </div>
    </div>

    <v-btn class="add-or-join-btn ma-2" fab outlined>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  name: "DeckList",

  components: { Avatar },
  props: {
    decks: {
      type: Array
    }
  },
  data: () => ({}),
  computed: {
    smAndDown() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
        case "sm":
          return true;
        default:
          return false;
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
.disk--active {
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
.add-or-join-btn {
  border: dashed;
  &:hover {
    border: solid;
  }
}
</style>
