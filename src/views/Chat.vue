<template>
  <Layout page="Chat" :users="members">
    <v-card-text class="flex-1">
      <MessageList :messages="filteredMessages" />
    </v-card-text>
    <v-card-actions>
      <MessageInputForm />
    </v-card-actions>
  </Layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

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
    // this.initDecksByUserId()
    this.initUsersByDeckId(this.$route.params.deck_id);
    this.initChatByDiskId(this.$route.params.disk_id);
  },
  computed: {
    ...mapState("users", ["members"]),
    //...mapState("chat", ["messages"])
    ...mapGetters("chat", ["filteredMessages"])
  },
  watch: {
    "$route.params.deck_id": function(value) {
      this.initUsersByDeckId(value);
    },
    "$route.params.disk_id": function(value) {
      this.initChatByDiskId(value);
    }
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    //...mapActions("decks", ["initDecksByUserId"]),
    ...mapActions("users", ["initUsersByDeckId"]), // this.members
    ...mapActions("chat", ["initChatByDiskId"]) // this.messages
  }
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
