<template>
  <v-sheet width="120">
    <v-select
      v-model="$i18n.locale"
      :items="langs"
      dense
      hide-details
      outlined
      single-line
    ></v-select>
  </v-sheet>
</template>

<script>
export default {
  name: "LocalSelect",

  data: () => ({
    langs: [
      { text: "English", value: "en" },
      { text: "日本語", value: "ja" },
    ],
  }),
};
</script>
