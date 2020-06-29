<template>
  <Layout page="DirectChat" :users="friends">
    <div class="d-flex flex-column main-slot">
      <MessageList :messages="filteredMessages" />
      <MessageInputForm />
    </div>
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
.main-slot {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}
</style>
