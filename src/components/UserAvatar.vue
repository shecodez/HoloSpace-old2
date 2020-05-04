<template>
  <div class="user-avatar-div">
    <Avatar :icon="user.icon_url" :name="user.name" :size="size" />

    <div class="online-status">
      <v-icon :color="statusColor" :size="iSize">{{ statusIcon }}</v-icon>
    </div>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  props: ["user", "size", "iSize"],
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
    statusIcon() {
      return !this.user.is_online || this.user.status === "HIDE"
        ? "mdi-circle"
        : this.statuses.find(s => s.name === this.user.status).icon;
    },
    statusColor() {
      return this.user.is_online
        ? this.statuses.find(s => s.name === this.user.status).color
        : "grey";
    }
  }
};
</script>

<style lang="scss" scoped>
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