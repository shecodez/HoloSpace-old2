<template>
  <div>
    <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="form-input">
        <v-text-field
          v-model="email"
          :error="errors.email"
          label="Email"
          :rules="r.email"
          type="email"
        ></v-text-field>
      </div>

      <div class="form-input">
        <v-text-field
          @click:append="showPassword = !showPassword"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          :error="errors.password"
          label="Password"
          :rules="r.password"
        ></v-text-field>
        <v-btn @click="forgot" class="forgot-password mb-3" small text>Forgot Password?</v-btn>
      </div>

      <div class="form-submit">
        <v-btn @click="submit" class="mt-4 primary" :loading="loading" block x-large>Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginForm",

  data: () => ({
    email: "",
    password: "",
    showPassword: false,
    valid: true,
    r: {
      email: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      password: [
        v => !!v || "Password is required",
        v => (v && v.length > 6) || "Password must be at least 6 characters"
      ]
    },
    errors: {}
  }),
  mounted() {
    this.$store.dispatch("auth/clearError");
    this.addStyleTransitionDelay();
  },
  computed: mapState("auth", ["error", "loading"]),
  watch: {
    // handle global error
    error(err) {
      if (err === null || err === undefined) return;
      let errors = {};
      errors.global = err;

      const ERR_MSG = err.toLowerCase();
      if (ERR_MSG.includes("email")) {
        errors.email = true;
      }
      if (ERR_MSG.includes("password")) {
        errors.password = true;
      }

      this.errors = errors;
    },
    email(input) {
      let errors = {};
      if (!input || !this.validEmail(input)) {
        errors.email = true;
      } else {
        errors.email = false;
      }

      this.errors = errors;
    }
  },
  methods: {
    addStyleTransitionDelay() {
      const formTextFields = document.getElementsByClassName("form-input");
      for (let i = 0; i < formTextFields.length; i += 1) {
        formTextFields[i].setAttribute(
          "style",
          `transition-delay: 0.${i * 2 + 2}s`
        );
      }

      const submitButton = document.querySelector(".form-submit");
      submitButton.setAttribute("style", "transition-delay: 0.6s");
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    submit: function() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password
        });
      }
    },
    forgot: function() {
      this.$refs.form.resetValidation();
      if (!this.email || !this.validEmail(this.email)) {
        let errors = {};
        errors.email = true;
        return (this.errors = errors);
      }

      if (this.validEmail(this.email)) {
        console.log("Open pw reset modal", this.email);
        // this.$store.dispatch("auth/resetPassword", {
        //   email: this.email,
        // });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-input,
.form-submit {
  left: -25px;
  opacity: 0;
  transition: 0.5s ease;
  position: relative;
  &.slide-in {
    opacity: 1;
    left: 0;
  }
}
.forgot-password {
  color: rgba(255, 255, 255, 0.7);
  padding: 0 !important;
  height: auto !important;
  &:hover {
    color: white;
  }
}
</style>
