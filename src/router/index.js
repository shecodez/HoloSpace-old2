import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Chat from "@/views/Chat.vue";
import DirectChat from "@/views/DirectChat.vue";
import Test from "@/views/Test.vue";

import firebase from "@/plugins/firebase";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "*",
  //   name: "Error",
  //   component: NotFound,
  // },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: "/d/:deck_id/:disk_id",
    name: "Chat",
    component: Chat,
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/d/:deck_id/holo/:disk_id",
  //   name: "HoloChat",
  //   component: HoloChat,
  //   meta: { requiresAuth: true },
  // }
  {
    path: "/direct",
    name: "DirectChatRoot",
    component: DirectChat,
    children: [
      { path: "/direct/d/:disk_id", name: "DirectChat", component: DirectChat },
      //{ path: "/direct/d/holo/:disk_id", name: "DirectHoloChat", component: DirectHoloChat },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/test/d/:deck_id",
    name: "TestRoot",
    component: Test,
    children: [
      { path: "/test/d/:deck_id/:disk_id", name: "Test", component: Test },
    ],
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const IS_AUTHENTICATED = firebase.auth().currentUser;

  const REQUIRES_AUTH = to.matched.some((record) => record.meta.requiresAuth);
  const REQUIRES_GUEST = to.matched.some((record) => record.meta.requiresGuest);

  if (REQUIRES_AUTH && !IS_AUTHENTICATED) {
    next("/login");
  } else if (REQUIRES_GUEST && IS_AUTHENTICATED) {
    next("/");
  } else {
    next();
  }
});

export default router;

// http://localhost:8080/d/h0VmIsl84msSL9BwnEvB/m9rk3tjt5l5caoJ0nefH
