<template>
  <v-avatar :color="colorByHashCode" :size="size" :left="left">
    <v-img v-if="icon" :src="icon"></v-img>
    <span v-else class="headline text--primary">{{ name.charAt(0) }}</span>
  </v-avatar>
</template>

<script>
export default {
  props: {
    icon: {
      type: String // URL
    },
    name: {
      type: String,
      default: ""
    },
    size: {
      type: String // Number
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    colorByHashCode() {
      return this.intToHSL(this.getHashCode(this.name));
    }
  },
  methods: {
    //  HSL = Hue, Saturation, Lightness
    //  So hues between 0-359 will cover all colors,
    //  saturation is how rich you want the color, 100% works for me,
    //  and Lightness determines the deepness:
    //    50% is normal,
    //    25% is dark colors,
    //    75% is pastel.
    //  src: https://stackoverflow.com/a/21682946
    getHashCode: function(str) {
      if (!str) return 0;

      let hash = 0;
      if (str.length === 0) return hash;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
      }
      return Math.floor(Math.abs(((Math.sin(hash) * 10000) % 1) * 16777216));
    },

    intToHSL: function(int) {
      if (!int) return "hsl(0, 0%, 75%)"; //grey

      var shortened = int % 360;
      return `hsl(${shortened},100%,32%)`;
    }
  }
};
</script>
