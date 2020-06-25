<template>
  <v-btn-toggle v-model="toggle" dense multiple>
    <v-btn @click="isMute = !isMute">
      <v-icon v-if="isMute">mdi-speaker-off</v-icon>
      <v-icon v-else>mdi-speaker</v-icon>
    </v-btn>

    <v-btn @click="isMic = !isMic">
      <v-icon v-if="isMic">mdi-microphone</v-icon>
      <v-icon v-else>mdi-microphone-off</v-icon>
    </v-btn>

    <v-btn @click="isHolo = !isHolo">
      <v-icon v-if="isHolo">mdi-hololens</v-icon>
      <v-icon v-else color="red">mdi-hololens</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  data: () => ({
    toggle: [0, 1, 2],
    isMute: false,
    isMic: false,
    isHolo: false,
    items: [
      { title: "Speaker" },
      { title: "Microphone" },
      { title: "Holo Mode" }
    ]
  }),
  methods: {
    updateOptions(value) {
      console.log("OptionToggleBtns.vue setUserOptions", value);
    }
  }
};
</script>