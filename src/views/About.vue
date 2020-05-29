<template>
  <Layout page="about">
    <h1>This is an about page</h1>
    <HelloI18n />
  </Layout>
</template>

<script>
import Layout from "@/layouts/Default.vue";
import HelloI18n from "@/components/HelloI18n";

export default {
  name: "About",
  components: { Layout, HelloI18n },
};
</script>
