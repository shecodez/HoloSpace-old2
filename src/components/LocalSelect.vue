<template>
  <v-sheet width="80">
    <v-select v-model="$i18n.locale" :items="langs" dense hide-details outlined></v-select>
  </v-sheet>
</template>

<script>
export default {
  name: "LocalSelect",

  data: () => ({
    langs: ["en", "ja"]
  })
};
</script>
