import Vue from "vue";
import Vuetify from "vuetify/lib";

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
        accent: "#880E4F",
        background: "#424242",
      },
      light: {
        primary: "#00BCD4",
        accent: "#FFC107",
        secondary: "#311B92",
        background: "#FFFFFF",
      },
    },
  },
};

export default new Vuetify(OPTIONS);
