<template>
  <Layout page="Login">
    <div id="form-title" class="title my-2">Hey, Welcome back!</div>

    <LoginForm />

    <div class="mt-3 form-link body-2">
      Need an Account?
      <router-link to="/register">Register</router-link>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default {
  name: "Login",
  components: {
    Layout,
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
#form-title {
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0;
  left: -30px;
  position: relative;
  transition: 0.5s ease;
  &.slide-in {
    left: 0;
    opacity: 1;
  }
}

.form-link {
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