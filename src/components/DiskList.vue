<template>
  <v-expansion-panel class="disk-list">
    <v-row no-gutters class="align-center py-1">
      <v-col class="ml-4" cols="auto">
        <DirectDiskFormDialog v-if="isDirect" :type="type" />
        <DiskFormDialog v-else :type="type" />
      </v-col>
      <v-col>
        <v-expansion-panel-header class="px-4 text-uppercase">{{ type }} disks</v-expansion-panel-header>
      </v-col>
    </v-row>

    <v-expansion-panel-content>
      <v-treeview
        :active="[currentDiskId]"
        :active-class="isDirect ? 'disk--active direct' : 'disk--active'"
        :items="disks"
        :load-children="getUsersOnDisk"
        color="primary--text"
        dense
      >
        <template v-slot:label="{ item }">
          <span v-if="item.deck_id">
            <router-link :to="diskRouteTo(item)">
              <v-avatar v-if="isDirect" class="group-avatar" size="36">
                <v-icon>mdi-account-group</v-icon>
              </v-avatar>

              <v-icon v-if="item.type === 'TEXT'" small>mdi-pound</v-icon>
              <span style="verticalAlign: middle;">{{ item.name }}</span>
            </router-link>
          </span>
          <span v-else>
            <Avatar :icon="item.avatar_url" :name="item.name" size="24" />
            <small class="ml-3">{{ item.name }}</small>
          </span>
        </template>

        <template v-slot:append="{ item }">
          <div v-if="item.deck_id" class="actions">
            <DirectDiskFormDialog v-if="isDirect" :data="item" :type="type" />
            <DiskFormDialog v-else :data="item" :type="type" />
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
import DirectDiskFormDialog from "@/components/DirectDiskFormDialog";

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "DiskList",
  components: { Avatar, DiskFormDialog, DirectDiskFormDialog },
  props: {
    disks: {
      type: Array
    },
    type: {
      type: String
    },
    isDirect: {
      type: Boolean,
      default: false
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
    },
    diskRouteTo(disk) {
      const IS_HOLO = disk.type === "HOLO";

      if (this.isDirect) {
        // HOLO ? ~/direct/d/holo/:disk_id ~/direct/d/:disk_id
        return `/direct/d${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      } else {
        // HOLO ? ~/d/:deck_id/:disk_id : `~/d/:deck_id/:disk_id
        return `/d/${disk.deck_id}${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      }
    }
  }
  // TODO: generate group avatar
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
  .group-avatar {
    display: none;
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
    .group-avatar {
      margin: 8px 8px 8px 0;
      display: inline-block;
      background-color: var(--v-primary-base);
    }
  }
  .disk--active.direct {
    &::after {
      border: 26px solid transparent;
      border-right-color: rgba(200, 200, 200, 0.1);
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