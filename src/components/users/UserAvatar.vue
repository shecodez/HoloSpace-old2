<template>
  <div class="user-avatar-div">
    <v-icon v-if="isCaptain" class="captain-stripes" color="warning" small>mdi-reorder-horizontal</v-icon>
    <Avatar :icon="user.icon_url" :name="user.name" :size="size" />

    <div class="online-status">
      <v-icon :color="statusColor" :size="iSize">{{ statusIcon }}</v-icon>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//import md5 from "md5";
import Avatar from "@/components/Avatar";

export default {
  props: {
    user: {
      type: Object
    },
    size: {
      type: String
    },
    iSize: {
      type: String,
      default: "14"
    }
  },
  components: { Avatar },
  data: () => ({
    statuses: [
      { name: "AWAY", color: "warning", icon: "mdi-circle" },
      { name: "BRB", color: "warning", icon: "mdi-clock" },
      { name: "BUSY", color: "error", icon: "mdi-circle" },
      {
        name: "DND",
        color: "error",
        icon: "mdi-minus-circle"
      },
      {
        name: "HIDE",
        color: "grey",
        icon: "mdi-close-circle-outline"
      },
      { name: "SHOW", color: "success", icon: "mdi-check-circle" }
    ]
  }),
  computed: {
    ...mapGetters("decks", ["deck"]),
    statusIcon() {
      const USER_STATUS = (this.user.status || "").toUpperCase();
      return !this.user.is_online || this.user.status === "HIDE"
        ? "mdi-circle"
        : this.statuses.find(s => s.name === USER_STATUS).icon;
    },
    statusColor() {
      const USER_STATUS = (this.user.status || "").toUpperCase();
      return this.user.is_online
        ? this.statuses.find(s => s.name === USER_STATUS).color
        : "grey";
    },
    isCaptain() {
      return this.user && this.user.id === this.deck.user_id;
    }
    // gravatar() {
    //   const HOLO_TAG = `${this.user.name}#${this.user.pin}`
    //   return `https://www.gravatar.com/avatar/${md5(HOLO_TAG)}.png?s=64&d=retro`;
    // },
  }
};
</script>

<style lang="scss" scoped>
.captain-stripes {
  position: absolute;
  z-index: 2;
  left: -2;
}
.user-avatar-div {
  position: relative;
  .online-status {
    position: absolute;
    right: -2px;
    bottom: -2px;
  }
}
.on-deck {
  .v-avatar {
    filter: none;
  }
}
.offline {
  .v-avatar {
    filter: grayscale(100%);
    &:hover {
      filter: none;
    }
  }
}
</style>
