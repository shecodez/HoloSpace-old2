<template>
  <v-autocomplete
    v-model="select"
    :loading="isLoading"
    :items="items"
    :search-input.sync="search"
    label="Search via HoloTag#1234..."
    prepend-inner-icon="mdi-magnify"
    item-text="name"
    item-value="id"
    chips
    cache-items
    hide-no-data
    filled
    rounded
    single-line
    dense
  >
    <template v-slot:selection="{ attrs, item, selected }">
      <v-chip v-bind="attrs" :input-value="selected" pill>
        <Avatar :icon="item.icon_url" :name="item.name" left />
        {{ `${item.name}#${item.pin}` }}
      </v-chip>
    </template>

    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <div class="my-1 mr-2">
          <Avatar :icon="data.item.icon_url" :name="data.item.name" size="40" />
        </div>
        <v-list-item-content>
          <v-list-item-title>{{ `${data.item.name}#${data.item.pin}` }}</v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
import Avatar from "@/components/Avatar";

export default {
  name: "SearchUsers",

  components: { Avatar },
  props: ["label", "onSearchSelect"],
  data() {
    return {
      isLoading: false,
      items: [],
      search: null,
      select: null,
      results: [
        { id: "1", icon_url: "", name: "test", pin: 1234 },
        { id: "2", icon_url: "", name: "jim", pin: 2034 },
        { id: "3", icon_url: "", name: "Newton", pin: 4553 },
        { id: "4", icon_url: "", name: "guest", pin: 4356 },
        { id: "5", icon_url: "", name: "another", pin: 2349 },
        { id: "6", icon_url: "", name: "andyetAnother", pin: 4995 },
        { id: "7", icon_url: "", name: "oneMoreforgoodMeasure", pin: 5631 },
        { id: "8", icon_url: "", name: "alfred", pin: 7433 },
        { id: "9", icon_url: "", name: "penny", pin: 3521 },
        { id: "10", icon_url: "", name: "durk", pin: 9566 },
        { id: "11", icon_url: "", name: "randal", pin: 6742 },
        { id: "12", icon_url: "", name: "hermit", pin: 5285 }
      ]
    };
  },
  watch: {
    select(id) {
      if (id !== null && id !== undefined) {
        const USER = this.items.find(x => x.id === id);
        this.onSearchSelect(USER);
      }
    },
    search(val) {
      val && val !== this.select && this.querySelections(val);
    }
  },
  methods: {
    querySelections(value) {
      this.isLoading = true;
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.results.filter(user => {
          return user.name.match(new RegExp(value, "gi"));
        });
        this.isLoading = false;
      }, 500);
    }
  }
};
</script>

<style>
</style>