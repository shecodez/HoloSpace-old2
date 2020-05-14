<template>
  <v-toolbar class="side-toolbar d-flex justify-center" flat>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.theme--dark {
  .side-toolbar {
    background-color: $dark-3;
  }
}
.theme--light {
  .side-toolbar {
    background-color: $light-3;
  }
}
</style>
