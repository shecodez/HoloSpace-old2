<template>
  <v-card class="mx-auto card-bg" max-width="344">
    <v-list-item>
      <UserAvatar :user="user" size="56" iSize="18" />

      <v-list-item-content class="display-1 ml-5 mt-2">
        {{ user.name }}
        <span class="caption grey--text">#{{ user.pin }}</span>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-list-item-title class="mb-1">Headline 5</v-list-item-title>
      <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
    </v-card-text>

    <v-card-actions>
      <v-btn text>Send Message</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserAvatar from "@/components/UserAvatar";

export default {
  name: "UserCard",

  components: { UserAvatar },
  props: {
    user: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.card-bg:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.4);
  top: -90%;
  transform: skewY(-15deg);
}
</style>