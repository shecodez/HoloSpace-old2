<template>
  <Layout page="Chat">
    <v-card-text class="flex-1">
      <MessageList />
    </v-card-text>
    <v-card-actions>
      <MessageInputForm />
    </v-card-actions>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Main.vue";
import MessageList from "@/components/MessageList";
import MessageInputForm from "@/components/MessageInputForm";

export default {
  name: "Chat",
  components: { Layout, MessageList, MessageInputForm }
};
</script>

<style lang="scss" scoped>
.flex-1 {
  flex: 1;
  overflow: hidden;
}
</style>
