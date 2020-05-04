<template>
  <v-expansion-panel class="disk-list">
    <v-row no-gutters class="align-center py-1">
      <v-col class="ml-4" cols="auto">
        <DiskFormDialog :type="type" />
      </v-col>
      <v-col>
        <v-expansion-panel-header class="px-4 text-uppercase">{{ type }} disks</v-expansion-panel-header>
      </v-col>
    </v-row>

    <v-expansion-panel-content>
      <v-treeview
        :active="[currentDiskId]"
        active-class="disk--active"
        :items="disks"
        :load-children="getUsersOnDisk"
        color="primary--text"
        dense
      >
        <template v-slot:label="{ item }">
          <router-link v-if="item.deck_id" :to="`/d/${item.deck_id}/${item.id}`">
            <v-icon v-if="item.type === 'TEXT'" small>mdi-pound</v-icon>
            <span style="verticalAlign: middle;">{{ item.name }}</span>
          </router-link>
          <span v-else>
            <Avatar :icon="item.avatar_url" :name="item.name" size="24" />
            <small class="ml-3">{{ item.name }}</small>
          </span>
        </template>

        <template v-slot:append="{ item }">
          <div v-if="item.deck_id" class="actions">
            <DiskFormDialog :data="item" />
          </div>
        </template>
      </v-treeview>
    </v-expansion-panel-content>
    <v-divider />
  </v-expansion-panel>
</template>

<script>
import Avatar from "@/components/Avatar";
import DiskFormDialog from "@/components/DiskFormDialog";

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "DiskList",
  components: { Avatar, DiskFormDialog },
  props: {
    disks: {
      type: Array
    },
    type: {
      type: String
    }
  },
  data: () => ({}),
  computed: {
    currentDiskId() {
      return this.$route.params.disk_id;
    }
  },
  methods: {
    async getUsersOnDisk(disk) {
      await pause(1500);

      return fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
        .then(res => res.json())
        .then(json => disk.children.push(...json))
        .catch(err => console.warn(err));
    }
  }
};
</script>

<style lang="scss">
.disk-list {
  background-color: transparent !important;

  .v-expansion-panel-content__wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .v-treeview > .v-treeview-node > :first-child {
    padding-left: 24px !important;
  }
  .disk--active,
  .v-treeview > .v-treeview-node > :first-child:hover {
    box-shadow: inset 4px 0 0 0 var(--v-primary-base);
    background: linear-gradient(
      to right,
      rgba(66, 66, 66, 1),
      rgba(66, 66, 66, 0)
    );
  }
  .v-treeview-node__label {
    a,
    i {
      color: #9e9e9e;
      &:hover {
        color: var(--v-primary-text-color);
      }
    }
  }

  .disk--active {
    a,
    i {
      color: var(--v-primary-text-color);
    }
    &::after {
      content: "";
      display: block;
      border: 20px solid transparent;
      border-right-color: rgba(200, 200, 200, 0.1);
      position: absolute;
      right: 0;
    }
  }

  .v-treeview-node__root:hover .actions {
    visibility: visible;
  }
  .actions {
    visibility: hidden;
    .v-btn {
      z-index: 9;
    }
  }

  .v-avatar {
    .headline {
      font-size: 1rem !important;
    }
  }
}
</style>