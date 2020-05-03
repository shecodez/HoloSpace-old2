<template>
  <Layout page="Chat" :users="members">
    <v-card-text class="flex-1">
      <MessageList />
    </v-card-text>
    <v-card-actions>
      <MessageInputForm />
    </v-card-actions>
  </Layout>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Layout from "@/layouts/Main.vue";
import MessageList from "@/components/MessageList";
import MessageInputForm from "@/components/MessageInputForm";

export default {
  name: "Chat",
  components: { Layout, MessageList, MessageInputForm },
  data: () => ({}),
  beforeMount() {
    this.setSideDrawerIsOpen(true);
    this.setMetaDrawerIsMini(false);
  },
  mounted() {
    // this.getDecksByUserId()
    this.getUsersByDeckId(this.$route.params.deck_id);
  },
  computed: mapState("users", ["members"]),
  watch: {
    "$route.params.deck_id": function(value) {
      this.getUsersByDeckId(value);
    }
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    //...mapActions("decks", ["getDecksByUserId"]),
    ...mapActions("users", ["getUsersByDeckId"]) // this.members
  }
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
