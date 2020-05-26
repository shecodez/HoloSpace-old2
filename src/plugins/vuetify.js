import Vue from "vue";
import Vuetify from "vuetify/lib";
// import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const OPTIONS = {
  theme: {
    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: "#6d4bc9",
        secondary: "#03DAC5",
        // anchor: colors.grey.darken1,
        accent: "#880E4F",
        background: "#424242",
      },
      light: {
        primary: "#00d1b2",
        accent: "#ffdd57",
        // anchor: colors.shades.black,
        secondary: "#311B92",
        background: "#FFFFFF",
      },
    },
  },
};

export default new Vuetify(OPTIONS);
