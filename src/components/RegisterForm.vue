<template>
  <div>
    <v-alert type="error" v-if="error" text>{{ error }}</v-alert>

    <v-form ref="form" v-model="valid" lazy-validation>
      <div class="form-input">
        <v-text-field
          v-model="username"
          :error="errors.username"
          label="Username"
          :rules="r.username"
        ></v-text-field>
      </div>

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
      </div>

      <div class="form-submit">
        <v-btn @click="submit" class="mt-4 primary" :loading="loading" block x-large>Register</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RegisterForm",

  data: () => ({
    username: "",
    email: "",
    password: "",
    showPassword: false,
    valid: true,
    r: {
      username: [
        v => !!v || "Username is required",
        v => (v && v.length > 2) || "Username must be at least 3 characters"
      ],
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
      if (ERR_MSG.includes("username")) {
        errors.username = true;
      }
      if (ERR_MSG.includes("email")) {
        errors.email = true;
      }
      if (ERR_MSG.includes("password")) {
        errors.password = true;
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
      submitButton.setAttribute("style", "transition-delay: 0.8s");
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("auth/register", {
          username: this.username,
          email: this.email,
          password: this.password
        });
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
</style>
