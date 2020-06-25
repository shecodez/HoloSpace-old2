<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay>
    <template v-slot:activator="{ on }">
      <v-btn icon small tile v-on="on">
        <v-icon>mdi-calendar</v-icon>
      </v-btn>
    </template>

    <v-card tile>
      <v-toolbar color="primary">
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Calendar</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text>settings</v-btn>
      </v-toolbar>

      <Calendar />
    </v-card>
  </v-dialog>
</template>

<script>
import Calendar from "@/components/calendar/Calendar";

export default {
  components: { Calendar },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
