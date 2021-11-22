import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SubmissionSuccess from "../components/submissionSuccess.vue";
import SubmissionFail from "../components/submissionFail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/thanks",
    name: "success",
    component: SubmissionSuccess,
  },
  {
    path: "/404",
    name: "fail",
    component: SubmissionFail,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
