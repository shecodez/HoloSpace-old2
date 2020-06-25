<template>
  <v-dialog v-model="dialog" persistent width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon small v-on="on">
        <v-icon v-if="!data">mdi-plus</v-icon>
        <v-icon v-else>mdi-playlist-edit</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="primary--text">{{ label }} Direct Disk: {{ type }}</v-card-title>

      <v-card-text>
        <SearchUsers :onSearchSelect="onSearchSelect" />

        <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="disk.name" label="Name (optional)" :rules="r.name"></v-text-field>
          <v-textarea v-model="disk.topic" label="Topic (optional)" :rules="r.topic" :counter="255"></v-textarea>
          <v-autocomplete
            v-model="disk.user_ids"
            :disabled="isLoading"
            :items="users"
            :rules="r.user_ids"
            label="Selected Users"
            item-text="name"
            item-value="id"
            chips
            counter
            hide-selected
            multiple
          >
            <template v-slot:selection="{ attrs, item, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                :close="item.id !== me.id"
                @click:close="remove(item)"
                pill
              >
                <Avatar :icon="item.icon_url" :name="item.name" left />
                {{ `${item.name}#${item.pin}` }}
              </v-chip>
            </template>

            <template v-slot:item="{ item }">
              <template v-if="typeof item !== 'object'">
                <v-list-item-content v-text="item"></v-list-item-content>
              </template>
              <template v-else>
                <div class="my-1 mr-2">
                  <Avatar :icon="item.icon_url" :name="item.name" size="40" />
                </div>
                <v-list-item-content>
                  <v-list-item-title>{{ `${item.name}#${item.pin}` }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn text @click="close">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="submit" class="primary" :loading="isLoading">{{ label }} Direct Disk</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import Avatar from "@/components/Avatar";
import SearchUsers from "@/components/users/SearchUsers";

export default {
  name: "DirectDiskFormDialog",

  components: { Avatar, SearchUsers },
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      default: "TEXT"
    }
  },
  data: () => ({
    dialog: false,
    disk: {
      name: "",
      topic: "",
      user_ids: []
    },
    valid: true,
    r: {
      //name: [v => (v && v.length >= 3) || "Minimum 3 characters"],
      //topic: [v => (v && v.length < 256) || "Maximum 255 characters"],
      user_ids: [v => (v && v.length > 1) || "Please select more users"]
    },
    users: []
  }),
  watch: {
    dialog(isOpen) {
      if (isOpen) this.open();
    }
  },
  computed: {
    ...mapState("users", ["friends"]),
    ...mapState("disks", ["error", "isLoading"]),
    ...mapGetters("me", ["me"]),
    label() {
      return this.data ? "Edit" : "Add";
    }
  },
  methods: {
    ...mapActions("disks", ["clearError", "addNewDirect"]),
    ...mapActions("app", ["setAlert"]),
    remove(item) {
      const IDX = this.disk.user_ids.indexOf(item.id);
      if (IDX >= 0) this.disk.user_ids.splice(IDX, 1);
    },
    onSearchSelect(user) {
      if (user) {
        this.users.push({ ...user, selected: true });
        if (this.disk.user_ids.indexOf(user.id) === -1) {
          this.disk.user_ids.push(user.id);
        }
      }
    },
    generateName() {
      const NAMES_ARR = this.disk.user_ids
        .filter(id => id !== this.me.id)
        .map(id => this.users.find(u => u.id === id).name);

      const MAX = 5;

      if (NAMES_ARR.length > MAX) {
        const SUB_ARR = NAMES_ARR.slice(0, MAX);
        return `${SUB_ARR.join(", ")} (+${NAMES_ARR.length - MAX} others)`;
      } else {
        return NAMES_ARR.join(", ");
      }
    },
    async submit() {
      if (this.$refs.form.validate()) {
        let response;
        if (this.data) {
          //result = await this.updateDirectDisk(this.disk);
        } else {
          if (this.disk.name && !this.disk.name.trim()) {
            this.disk.name = this.generateName();
          }
          response = await this.addNewDirect({
            ...this.disk,
            type: this.type
          });
        }
        if (response.success) {
          this.setAlert({
            type: "success",
            text: `${response.disk.name} Direct Disk successfully created.`
          });
          // TODO: add action (link) to alert i.e:
          // <router-link :to="`/direct/d/${result.deck_id}/${result.id}`">Open Disk</router-link>
          this.close();
        }
      }
    },
    open() {
      this.clearError();
      this.disk.user_ids.push(this.me.id);
      this.users = [
        //{ header: "Me" },
        {
          disabled: true,
          ...this.me,
          selected: true
        },
        { header: "Friends" },
        ...this.friends,
        { header: "Searched" }
      ];
      if (this.$refs["form"]) {
        this.$refs.form.resetValidation();
      }
    },
    close() {
      this.clearError();
      this.$refs.form.reset();
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.user-chips {
  max-height: 76px;
  overflow-y: auto;
  .v-chip {
    margin: 4px 8px 4px 0;
  }
}
</style>
