<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" label="Name"></v-text-field>
    <v-textarea v-model="details" label="Details"></v-textarea>
    <v-text-field v-model="start" type="date" label="Start Date"></v-text-field>
    <v-text-field v-model="end" type="date" label="End Date"></v-text-field>
    <!-- <v-color-picker v-model="color" flat></v-color-picker> -->
    <v-text-field v-model="color" type="color" label="Color"></v-text-field>

    <v-btn :disabled="!valid" block class="mt-3" color="success" @click="submit">Save</v-btn>
  </v-form>
</template>

<script>
export default {
  name: "EventForm",

  data: () => ({
    name: "",
    details: this.event.details || "",
    start: null,
    end: null,
    color: "#1976D2",
    valid: true
  }),
  props: {
    event: {
      type: Object
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const event = {
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color
        };
        console.log("Event", event);
        // this.event.id
        //? this.$emit('UpdateEvent', event);
        //: this.emit('AddEvent', event);
      }
    }
  }
};
</script>