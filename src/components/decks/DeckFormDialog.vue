<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn block color="primary" v-on="on">Add a Deck</v-btn>
    </template>

    <v-card>
      <v-card-title class="primary--text text-uppercase">Add your Deck</v-card-title>
      <v-card-subtitle>You're the captain of this deck, and you and your crew will have access to text, voice, and holo chat.</v-card-subtitle>

      <v-card-text>
        <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

        <v-row class="ma-0">
          <v-col>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="deck.name" label="Name" :rules="r.name"></v-text-field>
              <v-text-field v-model="deck.iconUrl" label="Icon URL" :rules="r.iconUrl"></v-text-field>
            </v-form>
          </v-col>
          <v-col cols="auto">
            <div class="icon-preview">
              <Avatar :name="deck.name" :icon="deck.iconUrl" size="128" />
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" class="primary" :loading="isLoading">Make it so #1</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Avatar from "@/components/Avatar";

export default {
  name: "DeckFormDialog",
  components: { Avatar },
  data: () => ({
    dialog: false,
    deck: {
      name: "",
      iconUrl: ""
    },

    valid: true,
    r: {
      name: [
        v => !!v || "Name is required",
        v => (v && v.length < 64) || "Name cannot be longer than 64 characters"
      ]
      //iconUrl: []
    }
  }),
  watch: {
    dialog(isOpen) {
      if (isOpen) this.open();
    }
  },
  computed: mapState("decks", ["error", "isLoading"]),
  methods: {
    ...mapActions("decks", ["clearError", "createDeck"]),
    ...mapActions("app", ["setAlert"]),
    async submit() {
      if (this.$refs.form.validate()) {
        let response = await this.createDeck(this.deck);
        if (response.success) {
          this.setAlert({
            type: "success",
            text: `Welcome aboard Captain! '${response.deck.name}' is now online.`
          });
          // TODO: add action (link) to alert :
          // <router-link :to="`/d/${response.deck.id}/${response.deck.disk_id}`">Open Deck</router-link>
          this.close();
        }
      }
    },
    open() {
      this.clearError();
      if (this.$refs["form"]) {
        this.$refs.form.resetValidation();
      }
    },
    close() {
      this.clearError();
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-preview {
  margin: 16px 0;
}
</style>