<template>
  <v-alert :type="type" border="left" class="ma-0" dismissible text tile>{{ text }}</v-alert>
</template>

<script>
export default {
  name: "Banner",

  props: {
    type: {
      type: String
    },
    text: {
      type: String,
      default: "???"
    }
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-alert {
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-top: 28px solid transparent;
    border-bottom: 28px solid transparent;
    border-right: 28px solid transparent;
    // TODO: make this the color of the left-border
    border-right-color: inherit;
  }
}
</style>
