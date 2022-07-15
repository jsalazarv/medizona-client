import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import auth from "@/router/auth";
import notes from "@/router/notes";
import Authenticated from "./middleware/Authenticated";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  ...auth,
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { public: false },
  },
  ...notes,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const BeforeMiddleware = [Authenticated];
BeforeMiddleware.forEach((middleware) => router.beforeEach(middleware));

export default router;
