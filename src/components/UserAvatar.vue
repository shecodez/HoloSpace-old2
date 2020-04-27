<template>
  <div class="root">
    <Avatar :icon="icon" :name="name" :size="size" />

    <div class="online-status">
      <v-icon color="grey" :size="iSize">mdi-circle</v-icon>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  props: ["icon", "name", "size", "iSize"],
  components: { Avatar }
};
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  .online-status {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>