<template>
  <div class="messages">
    <v-list two-line color="transparent">
      <template v-for="message in messages">
        <v-subheader
          v-if="message.header"
          :key="message.header"
          v-text="message.header"
        ></v-subheader>

        <v-list-item v-else :key="message.id">
          <div class="my-4 mr-4">
            <UserAvatar :user="authors[message.user_id]" size="40" iSize="14" />
          </div>

          <v-list-item-content>
            <v-list-item-title>
              {{ authors[message.user_id].name }}
              <span class="caption">{{ formatDate(message.created_at) }}</span>
            </v-list-item-title>

            <div>
              <span class="grey--text" v-html="message.text"></span>
              <small class="ml-1 font-italic" v-if="message.updated_at"
                >edited</small
              >
            </div>
          </v-list-item-content>
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
      type: Array,
    },
  },
  components: { UserAvatar },
  computed: {
    ...mapGetters("users", ["membersById"]),
    authors() {
      return this.messages.reduce((byId, message) => {
        byId[message.user_id] = this.membersById[message.user_id] || {
          name: "Loading...",
          icon_url: "",
        };
        return byId;
      }, {});
    },
  },
  methods: {
    formatDate(firestoreTimestamp) {
      return formatRelative(firestoreTimestamp.toDate(), new Date());
    },
  },
};
</script>

<style lang="scss" scoped>
.messages {
  height: 100%;
  overflow-y: auto;
}
</style>
