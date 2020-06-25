<template>
  <v-list-item
    :key="message.id"
    :class="fromMe ? 'justify-end' : 'justift-start'"
    style="alignItems: flex-start;"
  >
    <div v-if="!fromMe" class="mt-6 mr-3">
      <div v-if="message.addon" class="avatar-placeholder" />
      <UserAvatar v-else :user="authors[message.user_id]" size="40" />
    </div>

    <div class="message-bubble" :class="message.addon ? 'message--addon' : ''">
      <v-list-item-content class="px-3" :class="fromMe ? 'message--self' : 'message'">
        <v-list-item-title v-if="!message.addon">
          <span v-if="!fromMe" class="mr-2">{{ authors[message.user_id].name }}</span>
          <span class="caption grey--text">{{ formatDate(message.created_at) }}</span>
        </v-list-item-title>

        <v-list-item-subtitle class="message-text">
          <v-img v-if="message.media" :src="message.media" />
          <span v-else v-html="message.text" />
          <small class="ml-1 font-italic" v-if="message.updated_at">edited</small>
        </v-list-item-subtitle>
      </v-list-item-content>
    </div>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";
import { formatRelative } from "date-fns";

import UserAvatar from "@/components/users/UserAvatar";

export default {
  props: {
    message: {
      type: Object
    },
    authors: {
      type: Object
    }
  },
  components: { UserAvatar },
  computed: {
    ...mapState("auth", ["user"]),
    fromMe() {
      return this.message.user_id === this.user.uid;
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

.avatar-placeholder {
  width: 40px;
  height: 40px;
}

.message-bubble {
  margin-top: 12px;
  max-width: 85%;
  min-width: 15%;
  border-radius: 4px;
  .message {
    background-color: rgba($dark-4, $alpha);
  }
  .message--self {
    background-color: var(--v-primary-base);
    margin-right: 36px;
  }
  .message-text {
    white-space: normal;
  }
}
.message--addon {
  margin-top: 4px;
}
</style>
