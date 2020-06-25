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

import Layout from "@/layouts/MainLayout";
import MessageList from "@/components/chat/MessageList";
import MessageInputForm from "@/components/chat/MessageInputForm";

export default {
  name: "DirectChat",
  components: { Layout, MessageList, MessageInputForm },
  data: () => ({}),
  beforeMount() {
    this.setSideDrawerIsOpen(true);
    this.setMetaDrawerIsMini(true);
  },
  created() {
    // this.getSubsByDiskId()
    this.getFriendsOfUid();
    this.getChatByDiskId(this.$route.params.disk_id);
    this.getDisksByUid();
  },
  computed: {
    ...mapState("users", ["friends"]),
    ...mapGetters("chat", ["filteredMessages"]),
    ...mapState("auth", ["user"])
  },
  watch: {
    "$route.params.disk_id": function(value) {
      this.getChatByDiskId(value);
    }
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    ...mapActions("users", ["getFriendsOfUid"]),
    ...mapActions("disks", ["getDisksByUid"]),
    ...mapActions("chat", ["getChatByDiskId"])
  }
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
