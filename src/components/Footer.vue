<template>
  <v-footer app :style="{ display: show ? 'block' : 'none' }">
    <!-- &copy; {{ new Date().getFullYear() }} — <strong>HoloSpace</strong> -->
    <div class="d-flex align-center justify-center">
      made with
      <v-icon>mdi-heart</v-icon>&nbsp;shecodez | NJN
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",

  props: ["show"]
};
</script>