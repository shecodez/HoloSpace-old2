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
        :load-children="getPresence"
        color="primary--text"
        dense
      >
        <template v-slot:label="{ item }">
          <span v-if="item.type">
            <v-avatar v-if="isDirect" class="group-avatar" size="36">
              <v-icon>mdi-account-group</v-icon>
            </v-avatar>
            <router-link :to="linkTo(item)">{{ item.name }}</router-link>
          </span>
          <span v-else>
            <Avatar :icon="item.avatar_url" :name="item.name" size="24" />
            <small class="ml-3">{{ item.name }}</small>
          </span>
        </template>

        <template v-slot:append="{ item }">
          <div v-if="item.type" class="actions">
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
import DiskFormDialog from "@/components/disks/DiskFormDialog";
import DirectDiskFormDialog from "@/components/disks/DirectDiskFormDialog";

export default {
  name: "DiskList",
  components: { Avatar, DiskFormDialog, DirectDiskFormDialog },
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
    },
    isDirect() {
      return this.$route.name.includes("Direct"); // IE .indexOf()
    }
  },
  methods: {
    linkTo(disk) {
      const IS_HOLO = disk.type === "HOLO";

      if (this.isDirect) {
        // HOLO ? ~/direct/d/holo/:disk_id ~/direct/d/:disk_id
        return `/direct/d${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      } else {
        // HOLO ? ~/d/:deck_id/:disk_id : `~/d/:deck_id/:disk_id
        return `/d/${disk.deck_id}${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      }
    },
    async getPresence(onDisk) {
      let users = [
        { id: 1, name: "Lenne Graham" },
        { id: 2, name: "Erbom Nells" },
        { id: 3, name: "Baunch Clementine" }
      ];
      let promise = new Promise(function(resolve) {
        setTimeout(() => resolve(users), 1500);
      });

      return promise
        .then(users => onDisk.children.push(...users))
        .catch(err => console.error(err));
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
    padding-left: 30px !important;
  }

  .disk--active,
  .v-treeview > .v-treeview-node > :first-child:hover {
    box-shadow: inset 4px 0 0 0 var(--v-primary-base);
    background: linear-gradient(
      to right,
      rgba(66, 66, 66, 1),
      rgba(66, 66, 66, 0)
    );
    a,
    i {
      color: var(--v-primary-text-color);
    }
  }
  .v-treeview-node__label {
    a,
    i {
      color: #9e9e9e;
    }
  }

  .disk--active {
    &::after {
      content: "";
      display: block;
      border: 20px solid transparent;
      border-right-color: rgba(200, 200, 200, 0.1);
      position: absolute;
      right: 0;
    }

    a,
    i {
      color: var(--v-primary-text-color);
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

  // .group-avatar {
  //   display: none;
  // }
  .group-avatar {
    margin: 8px 8px 8px 0;
    display: inline-block;
    background-color: rgba(200, 200, 200, 0.1);
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