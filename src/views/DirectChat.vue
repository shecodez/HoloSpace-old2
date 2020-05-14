<template>
  <Layout page="DirectChat" :users="friends">
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
  name: "DirectChat",
  components: { Layout, MessageList, MessageInputForm },
  data: () => ({}),
  beforeMount() {
    this.setSideDrawerIsOpen(true);
    this.setMetaDrawerIsMini(true);
  },
  mounted() {
    // this.initDecksByUserId()
    this.initUsersByUserId();
    this.initChatByDiskId(this.$route.params.disk_id);
  },
  computed: {
    ...mapState("users", ["friends"]),
    ...mapGetters("chat", ["filteredMessages"]),
    ...mapState("auth", ["user"]),
  },
  watch: {
    "$route.params.disk_id": function(value) {
      this.initChatByDiskId(value);
    },
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    ...mapActions("users", ["initUsersByUserId"]), // this.friends
    ...mapActions("chat", ["initChatByDiskId"]), // this.messages
  },
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
