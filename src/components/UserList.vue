<template>
  <v-list color="transparent">
    <v-subheader class="overline">
      <v-badge>
        <template v-slot:badge>{{ users.length }}</template>
        <span>{{ this.on ? "On Deck" : "Offline" }}</span>
      </v-badge>
    </v-subheader>

    <v-list-item v-for="user in users" :key="user.id">
      <v-menu :close-on-content-click="false" left offset-x>
        <template v-slot:activator="{ on }">
          <div class="cursor-pointer" v-on="on">
            <UserAvatar :user="user" size="40" />
          </div>
        </template>

        <UserCard :user="user" :me="me(user.id)" />
      </v-menu>
      <v-list-item-title class="ml-4">{{ user.name }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from "vuex";

import UserAvatar from "@/components/UserAvatar";
import UserCard from "@/components/UserCard";

export default {
  props: {
    users: {
      type: Array,
      default: () => []
    },
    on: {
      type: Boolean,
      default: false
    }
  },
  components: { UserAvatar, UserCard },
  computed: {
    ...mapState("auth", ["user"])
  },
  methods: {
    me(id) {
      return id === this.user.uid;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.theme--dark {
  .v-list-item:hover {
    background: linear-gradient(to right, $dark-2, rgba(0, 0, 0, 0));
  }
}
.theme--light {
  .v-list-item:hover {
    background: linear-gradient(to right, $light-2, rgba(0, 0, 0, 0));
  }
}

.cursor-pointer {
  cursor: pointer;
}
</style>