<template>
  <v-list-item
    :key="message.id"
    :class="fromMe ? 'justify-end' : 'justift-start'"
    style="alignItems: flex-start;"
  >
    <div v-if="!fromMe" class="mt-3 mr-3">
      <div v-if="message.addToPrev" class="avatar-placeholder" />
      <UserAvatar v-else :user="authors[message.user_id]" size="40" />
    </div>

    <div class="message" :class="message.addToPrev ? 'message--addon' : ''">
      <v-list-item-content class="px-3" :class="fromMe ? 'message--self' : ''">
        <v-list-item-title v-if="!message.addToPrev">
          <span v-if="!fromMe" class="mr-2">
            {{ authors[message.user_id].name }}
          </span>
          <span class="caption grey--text">
            {{ formatDate(message.created_at) }}
          </span>
        </v-list-item-title>

        <v-list-item-subtitle class="message-text">
          <v-img v-if="message.media" :src="message.media" />
          <span v-else v-html="message.text" />
          <small class="ml-1 font-italic" v-if="message.updated_at">
            edited
          </small>
        </v-list-item-subtitle>
      </v-list-item-content>
    </div>
  </v-list-item>
</template>

<script>
import { mapState } from "vuex";
import { formatRelative } from "date-fns";

import UserAvatar from "@/components/UserAvatar";

export default {
  props: {
    message: {
      type: Object,
    },
    authors: {
      type: Object,
    },
  },
  components: { UserAvatar },
  computed: {
    ...mapState("auth", ["user"]),
    fromMe() {
      return this.message.user_id === this.user.uid;
    },
  },
  methods: {
    formatDate(firestoreTimestamp) {
      if (!firestoreTimestamp) return;
      return formatRelative(firestoreTimestamp.toDate(), new Date());
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.message--self {
  background-color: var(--v-primary-base);
}
.avatar-placeholder {
  width: 40px;
  height: 40px;
}
.message {
  background-color: rgba($dark-4, $alpha);
  margin-top: 16px;
  max-width: 85%;
  .message-text {
    white-space: normal;
  }
}
.message--addon {
  margin-top: 4px;
}
</style>
