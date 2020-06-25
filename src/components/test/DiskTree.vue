<template>
  <v-expansion-panel>
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
        active-class="hs-active"
        :active="[routeParamsDiskId]"
        :items="disks"
        :load-children="getPresence"
        dense
      >
        <template v-slot:label="{ item }">
          <div v-if="item.deck_id" class="py-2">
            <router-link :to="linkTo(item)">{{ item.name }}</router-link>
          </div>
          <div v-else>
            <Avatar :icon="item.avatar_url" :name="item.name" size="24" />
            <small class="ml-3">{{ item.name }}</small>
          </div>
        </template>

        <template v-slot:append="{ item }">
          <div v-if="item.deck_id" class="action-btns">
            <DiskFormDialog :data="item" type="TEXT" />
          </div>
        </template>
      </v-treeview>
    </v-expansion-panel-content>
    <v-divider></v-divider>
  </v-expansion-panel>
</template>

<script>
import Avatar from "@/components/Avatar";
import DiskFormDialog from "@/components/disks/DiskFormDialog";

export default {
  name: "DiskTree",

  props: {
    disks: {
      type: Array
    },
    type: {
      type: String
    }
  },
  components: { Avatar, DiskFormDialog },
  computed: {
    routeParamsDiskId() {
      return this.$route.params.disk_id;
    }
  },

  methods: {
    linkTo(disk) {
      const IS_HOLO = disk.type === "HOLO";

      if (this.$route.name.includes("Direct")) {
        // HOLO ? ~/direct/d/holo/:disk_id ~/direct/d/:disk_id
        return `/direct/d${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
      } else {
        // HOLO ? ~/d/:deck_id/:disk_id : `~/d/:deck_id/:disk_id
        return `/test/d/${disk.deck_id}${IS_HOLO ? "/holo/" : "/"}${disk.id}`;
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
};
</script>

<style lang="scss">
.hs-disks {
  background-color: transparent !important;

  .action-btns {
    visibility: hidden;
    .v-btn {
      z-index: 9;
    }
  }
  .v-treeview-node__root:hover .action-btns {
    visibility: visible;
  }

  .hs-active,
  .v-list-item:hover,
  .v-treeview > .v-treeview-node > :first-child:hover {
    box-shadow: inset 4px 0 0 0 var(--v-primary-base);
    background: linear-gradient(
      to right,
      rgba(66, 66, 66, 1),
      rgba(66, 66, 66, 0)
    );
  }

  .hs-active {
    &::after {
      content: "";
      display: block;
      border: 20px solid transparent;
      border-right-color: rgba(200, 200, 200, 0.1);
      position: absolute;
      right: 0;
    }
  }

  .v-treeview > .v-treeview-node > :first-child {
    padding-left: 30px !important;
  }

  .v-avatar {
    .headline {
      font-size: 1rem !important;
    }
  }
}
</style>