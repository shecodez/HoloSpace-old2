<template>
  <div class="messages">
    <v-list two-line color="transparent">
      <template v-for="message in messages">
        <!-- <v-subheader v-if="message.header" :key="message.header" v-text="message.header"></v-subheader> -->

        <v-list-item :key="message.id" style="alignItems: flex-start;">
          <div class="mt-4 mr-4">
            <UserAvatar :user="authors[message.user_id]" size="40" iSize="14" />
          </div>
          <div class="message-blocks">
            <div v-for="(block, i) in message.blocks" :key="block.id" class="message">
              <v-list-item-content class="pl-3" :class="message.me ? 'message--my' : ''">
                <v-list-item-title class="message-meta">
                  <span v-if="!message.me && i === 0">{{ authors[block.user_id].name }}</span>
                  <span class="caption grey--text">{{ formatDate(block.created_at) }}</span>
                </v-list-item-title>

                <v-list-item-subtitle class="message-text">
                  <span v-html="block.text"></span>
                  <small class="ml-1 font-italic" v-if="block.updated_at">edited</small>
                </v-list-item-subtitle>
              </v-list-item-content>
            </div>
          </div>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatRelative } from "date-fns";

import UserAvatar from "@/components/UserAvatar";

export default {
  props: {
    messages: {
      type: Array
    }
  },
  components: { UserAvatar },
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
  },
  methods: {
    formatDate(firestoreTimestamp) {
      if (!firestoreTimestamp) return;
      return formatRelative(firestoreTimestamp.toDate(), new Date());
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
.message--my {
  background-color: var(--v-primary-base);
}

.message-blocks {
  margin-bottom: 8px;
  .message {
    background-color: rgba($dark-4, $alpha);
    margin-bottom: 4px;
    .message-meta > span {
      margin-right: 8px;
    }
    .message-text {
      white-space: normal;
    }
  }
}
</style>
