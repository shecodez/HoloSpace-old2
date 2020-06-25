<template>
  <div class="messages">
    <v-list color="transparent">
      <template v-for="(message) in messages">
        <!-- <v-subheader v-if="message.header" :key="message.header" v-text="message.header"></v-subheader> -->
        <MessageListItem :key="message.id" :message="message" :authors="authors" />
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import MessageListItem from "@/components/chat/MessageListItem";

export default {
  props: {
    messages: {
      type: Array
    }
  },
  components: { MessageListItem },
  computed: {
    ...mapGetters("users", ["membersById"]),
    authors() {
      return this.messages.reduce((byId, message) => {
        byId[message.user_id] = this.membersById[message.user_id] || {
          name: "Loading...",
          icon_url: ""
        };
        return byId;
      }, {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.messages {
  height: 100%;
  overflow-y: auto;
}
</style>
