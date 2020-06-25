<template>
  <v-dialog v-model="dialog" fullscreen>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-settings-outline</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-container fill-height>
        <v-row no-gutters>
          <v-col cols="auto">
            <v-card tile>
              <v-navigation-drawer floating permanent tile>
                <v-list shaped>
                  <v-list-item-group v-model="item" color="primary">
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      :disabled="!!item.subheader"
                    >
                      <v-subheader class="overline" v-if="item.subheader">{{item.subheader}}</v-subheader>

                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

                <template v-slot:append>
                  <div class="px-4 py-2 d-flex align-center">
                    <div class="text--secondary">
                      <v-icon left>mdi-tag-outline</v-icon>
                      <span>v{{appVer}}</span>
                    </div>
                    <v-spacer />
                    <ToggleThemeBtn />
                    <v-btn @click="logout" color="error" icon>
                      <v-icon>mdi-logout</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-navigation-drawer>
            </v-card>
          </v-col>

          <v-col>
            <v-card tile>
              <v-card-title>{{ user.displayName }} Settings</v-card-title>

              <v-card-text>
                <v-btn>change Avatar</v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="auto">
            <v-btn class="close-btn" @click="dialog = false" fab icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import ToggleThemeBtn from "@/components/ToggleThemeBtn";

export default {
  name: "SettingsDialog",
  components: { ToggleThemeBtn },
  data() {
    return {
      appVer: process.env.VUE_APP_VERSION,
      dialog: false,
      item: 1,
      items: [
        { subheader: "User Settings" },
        { title: "My Account", icon: "mdi-account" },
        { title: "About", icon: "mdi-help-box" },
        { title: "User Controls" },
        { subheader: "App Settings" },
        { title: "Option 1" },
        { title: "Option 2" },
        { title: "Option 3" }
      ],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
    ...mapGetters("auth", ["isLoggedIn"])
  },
  methods: mapActions("auth", ["logout"]),
  watch: {
    isLoggedIn(loggedIn) {
      if (!loggedIn) {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.close-btn {
  margin: 0 12px;
  border: dashed;
  &:hover {
    border: solid;
  }
}
.v-card {
  height: 100%;
  box-shadow: none;
}
</style>