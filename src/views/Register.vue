<template>
  <Layout page="Register">
    <div id="form-title" class="title my-2">Create an Account</div>

    <RegisterForm />

    <div class="mt-3 form-link body-2">
      Have an Account?
      <router-link to="/login">Login</router-link>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Auth.vue";
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Register",
  components: {
    Layout,
    RegisterForm
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
