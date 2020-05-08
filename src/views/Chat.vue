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
import { differenceInMilliseconds } from "date-fns";

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
    ...mapGetters("chat", ["filteredMessages"]),
    ...mapState("auth", ["user"]),
    groupedMessages() {
      const GROUPED_MESSAGES = [];
      if (!this.filteredMessages.length) return;

      this.filteredMessages.forEach((message, i) => {
        let previousMessage = this.filteredMessages[i - 1];
        if (i === 0) {
          GROUPED_MESSAGES.push(message);
        } else {
          if (previousMessage && previousMessage.user_id === message.user_id) {
            const MS = differenceInMilliseconds(
              new Date(message.created_at.toDate()),
              new Date(previousMessage.created_at.toDate())
            );
            if (MS <= 60 * 1000) {
              GROUPED_MESSAGES.push({
                ...message,
                addOnMessage: true,
                isUnderMin: true
              });
            } else {
              GROUPED_MESSAGES.push({
                ...message,
                sameAuthor: true,
                addOnMessage: true
              });
            }
          } else {
            GROUPED_MESSAGES.push(message);
          }
        }
      });

      console.log("GROUPED_MESSAGES", GROUPED_MESSAGES);
      return GROUPED_MESSAGES;
    }
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
    ...mapActions("chat", ["initChatByDiskId"]), // this.messages
    messageBlock(message) {
      const MESSAGE_BLOCK = {
        id: message.id,
        user_id: message.user_id,
        me: message.user_id === this.user.uid,
        blocks: []
      };
      MESSAGE_BLOCK.blocks.push(message);
      return MESSAGE_BLOCK;
    }
  }
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
