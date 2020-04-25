<template>
  <v-container class="page-layout" fill-height fluid>
    <v-sheet class="mx-auto" color="transparent">
      <div class="auth-layout">
        <div class="logo-div d-flex align-center justify-center">
          <div>
            <v-img
              id="hs-logo"
              alt="HoloSpace Logo"
              contain
              :src="require('../assets/logo_cube.png')"
              width="150"
            />
            <v-img
              id="hs-name"
              alt="HoloSpace Name"
              contain
              :src="require('../assets/logo_text.png')"
              width="150"
            />
          </div>
        </div>

        <div class="form-div">
          <slot></slot>
        </div>
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
//import bg1 from "@/assets/fire-planet-ice-1920x1200.jpg";
//import bg2 from "@/assets/flat-mountains-1080p.jpg";
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    bgs: [
      "https://wallpapersite.com/images/pages/pic_w/1063.jpg",
      "http://www.hdwallpaper.nu/wp-content/uploads/2017/04/PLAYERUNKNOWNS-BATTLEGROUNDS-12937710.jpg",
      "https://www.hdwallpapers.in/walls/overwatch_4k-HD.jpg",
      "https://images.alphacoders.com/186/186993.jpg",
      "https://images4.alphacoders.com/602/thumb-1920-602788.png"
    ],
    timeoutAnimation: ""
  }),
  beforeMount() {
    this.setShowAppBar(true);
    this.setShowFooter(false);
  },
  computed: mapState("auth", ["user"]),
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/chat");
      }
    }
  },
  methods: {
    ...mapActions("app", ["setShowAppBar", "setShowFooter"]),
    selectBgImg() {
      const css = `.page-layout, .form-div:before, .logo-div:before { background: url(${
        this.bgs[Math.floor(Math.random() * this.bgs.length)]
      }) center fixed; }`;

      const page = document.querySelector(".page-layout");

      const style = document.createElement("style");
      style.type = "text/css";
      if (style.styleSheet) {
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }

      page.appendChild(style);
    },
    animateForm() {
      const logoDiv = document.querySelector(".logo-div");
      const holospaceLogo = document.getElementById("hs-logo");
      const holospaceName = document.getElementById("hs-name");
      const formDiv = document.querySelector(".form-div");
      const formTitle = document.getElementById("form-title");
      const formTextFields = document.getElementsByClassName("form-input");
      const submitButton = document.querySelector(".form-submit");
      const formLink = document.querySelector(".form-link");
      formLink.setAttribute("style", "transition-delay: 0.8s");

      this.timeoutAnimation = setTimeout(() => {
        logoDiv.classList.add("transition");
        setTimeout(() => {
          holospaceLogo.classList.add("slide-in");
          setTimeout(() => {
            holospaceName.classList.add("slide-in");
            setTimeout(() => {
              formDiv.classList.add("transition");
              setTimeout(() => {
                formDiv.classList.add("slide-in");
                setTimeout(() => {
                  formTitle.classList.add("slide-in");
                  for (let i = 0; i < formTextFields.length; i += 1) {
                    formTextFields[i].classList.add("slide-in");
                  }
                  submitButton.classList.add("slide-in");
                  formLink.classList.add("slide-in");
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 1000);
      }, 10);
    }
  },
  mounted() {
    this.selectBgImg();
    this.animateForm();
  },
  beforeDestroy() {
    if (this.timeoutAnimation) {
      clearTimeout(this.timeoutAnimation);
    }
  }
};
</script>

<style lang="scss" scoped>
.page-layout,
.logo-div:before,
.form-div:before {
  background-size: cover !important;
}

.auth-layout {
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  display: flex;
}

.logo-div {
  padding: 45px 35px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  overflow: hidden;
  transform: scale(0, 0);
  &:before {
    content: "";
    position: absolute;
    top: -50px;
    left: -50px;
    width: 150%;
    height: 150%;
    filter: blur(10px);
    box-shadow: inset 0 0 0 3000px rgba(255, 255, 255, 0.8);
  }
  &.transition {
    transform: scale(1, 1);
    transition: 700ms ease;
  }

  #hs-logo {
    top: -20px;
    opacity: 0;
    &.slide-in {
      top: 0;
      opacity: 1;
      transition: 0.8s ease;
    }
  }

  #hs-name {
    margin-top: -60px;
    opacity: 0;
    &.slide-in {
      margin-top: 10px;
      opacity: 1;
      transition: 0.8s ease;
    }
  }
}

.form-div {
  padding: 45px 35px;
  box-sizing: border-box;
  //position: relative;
  width: 380px;
  margin-left: -380px;
  overflow: hidden;
  height: 0;
  opacity: 0;
  &:before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    top: -50px;
    left: -50px;
    filter: blur(10px);
    box-shadow: inset 0 0 0 3000px rgba(40, 43, 48, 0.75);
  }
  &.transition {
    height: auto;
    //height: 440px; // if page = register
    //height: 402px; // if page = login
    transition: height 0.5s ease;
  }
  &.slide-in {
    opacity: 1;
    margin-left: 0;
    transition: 0.5s ease;
  }
}
</style>
