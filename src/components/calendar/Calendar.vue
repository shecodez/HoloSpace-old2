<template>
  <v-row class="fill-height" no-gutters>
    <v-col cols="auto" class="d-flex flex-grow-0 flex-shrink-1">
      <v-card class="mx-auto" tile>
        <!-- TODO: background will be an image of forcast (i.e. clouds if cloudy) -->
        <v-navigation-drawer permanent color="grey darken-2">
          <v-list>
            <v-list-item>
              <v-list-item-icon class="mr-1">
                <v-icon color="primary">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Atlanta</v-list-item-title>
                <v-list-item-subtitle>GA</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <span class="display-2">72</span>
                <v-icon small>mdi-circle-outline</v-icon>
              </v-list-item-icon>
            </v-list-item>

            <v-list-item class="text-center mb-4">
              <v-list-item-content>
                <div style="font-size: 72px;">1</div>
                <v-list-item-title class="text-uppercase">Monday</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-subheader>Upcoming Events:</v-subheader>
            <v-list-item v-for="event in events.slice(0, 3)" :key="event.name" link>
              <v-list-item-action>
                <v-icon color="error">mdi-close</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ event.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <template v-slot:append>
            <div class="pa-4">
              <v-btn block @click="dialog = true">Add Event</v-btn>
            </div>
          </template>
        </v-navigation-drawer>
      </v-card>
    </v-col>

    <v-col>
      <v-sheet>
        <v-toolbar flat>
          <v-btn icon @click="drawer = !drawer">
            <v-icon v-if="!drawer">mdi-wrap-disabled</v-icon>
            <v-icon v-else class="mdi-rotate-180">mdi-wrap-disabled</v-icon>
          </v-btn>

          <v-btn outlined class="mx-4" @click="setToday">Today</v-btn>

          <v-btn fab text small @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">{{ $refs.calendar.title }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn outlined>Add Event</v-btn>
        </v-toolbar>

        <v-sheet class="mx-auto">
          <v-slide-group
            show-arrows
            next-icon="mdi-chevron-right"
            prev-icon="mdi-chevron-left"
            :value="0"
          >
            <v-slide-item v-for="(month, i) in months" :key="i" v-slot:default="{ active, toggle }">
              <v-btn class="ma-1" :input-value="active" text tile @click="toggle">{{ month }}</v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-sheet>

      <!-- Add event dialog -->
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-text>
            <EventForm />
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>

            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import EventForm from "@/components/calendar/EventForm";

export default {
  name: "Calendar",

  components: { EventForm },
  data: () => ({
    dialog: false,
    drawer: true,

    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ],
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    }
  }
};
</script>
