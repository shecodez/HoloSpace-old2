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
//import { differenceInMilliseconds } from "date-fns";

import Layout from "@/layouts/MainLayout";
import MessageList from "@/components/chat/MessageList";
import MessageInputForm from "@/components/chat/MessageInputForm";

export default {
  name: "Chat",
  components: { Layout, MessageList, MessageInputForm },
  data: () => ({}),
  beforeMount() {
    this.setSideDrawerIsOpen(true);
    this.setMetaDrawerIsMini(false);
  },
  created() {
    this.getMbrsByDeckId(this.$route.params.deck_id);
    this.getChatByDiskId(this.$route.params.disk_id);
  },
  computed: {
    ...mapState("users", ["members"]),
    ...mapGetters("chat", ["filteredMessages"]),
    ...mapState("auth", ["user"])
  },
  watch: {
    "$route.params.deck_id": function(value) {
      this.getMbrsByDeckId(value);
    },
    "$route.params.disk_id": function(value) {
      this.getChatByDiskId(value);
    }
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    ...mapActions("users", ["getMbrsByDeckId"]),
    ...mapActions("chat", ["getChatByDiskId"]),
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
// groupedMessages() {
//   if (!this.filteredMessages.length) return;
//   const GROUPED_MESSAGES = [];

//   this.filteredMessages.forEach((message, i) => {
//     let previousMessage = this.filteredMessages[i - 1];
//     if (i === 0) {
//       GROUPED_MESSAGES.push(message);
//     } else {
//       if (previousMessage && previousMessage.user_id === message.user_id) {
//         const MS_DIFF = differenceInMilliseconds(
//           new Date(message.created_at.toDate()),
//           new Date(previousMessage.created_at.toDate())
//         );
//         if (MS_DIFF <= 60 * 1000) {
//           let previousGroupedMessage = GROUPED_MESSAGES[i - 1];
//           GROUPED_MESSAGES.push({
//             addToPrev: true,
//             isSameMinute: true,
//             hideMeta: previousGroupedMessage.isSameMinute,
//             ...message,
//           });
//         } else {
//           GROUPED_MESSAGES.push({
//             addToPrev: true,
//             isSameAuthor: true,
//             ...message,
//           });
//         }
//       } else {
//         GROUPED_MESSAGES.push(message);
//       }
//     }
//   });

//   console.log("GROUPED_MESSAGES", GROUPED_MESSAGES);
//   return GROUPED_MESSAGES;
// },
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>

