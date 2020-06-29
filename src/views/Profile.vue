<template>
  <Layout page="Profile" :users="friends">
    <UserModel :user="user" />
  </Layout>
</template>

<script>
import { mapActions, mapState } from "vuex";

import Layout from "@/layouts/MainLayout";
import UserModel from "@/components/users/UserModelScene";

export default {
  name: "Profile",

  components: { Layout, UserModel },
  data: () => ({}),
  beforeMount() {
    this.setSideDrawerIsOpen(false);
    this.setMetaDrawerIsMini(false);
  },
  created() {
    this.getFriendsOfUid();
  },
  computed: {
    ...mapState("users", ["friends"]),
    ...mapState("auth", ["user"])
  },
  methods: {
    ...mapActions("app", ["setSideDrawerIsOpen", "setMetaDrawerIsMini"]),
    ...mapActions("users", ["getFriendsOfUid"])
  }
};
</script>

