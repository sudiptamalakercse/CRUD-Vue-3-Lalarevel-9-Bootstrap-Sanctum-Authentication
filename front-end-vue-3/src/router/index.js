import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue';
import IndexComponent from "../views/pages/IndexComponent.vue";
import ChartsComponent from "../views/pages/ChartsComponent.vue";
import FullWidthComponent from "../views/pages/FullWidthComponent.vue";
import FormBasicComponent from "../views/pages/FormBasicComponent.vue";
import FormWizardComponent from "../views/pages/FormWizardComponent.vue";
import Error403Component from "../views/pages/Error403Component.vue";
import SignUpAdminComponent from "../views/pages/SignUpAdminComponent.vue";
import SignUpUserComponent from "../views/pages/SignUpUserComponent.vue";
import LogInAdminComponent from "../views/pages/LogInAdminComponent.vue";
import LogInUserComponent from "../views/pages/LogInUserComponent.vue";
import AddPostByAdminComponent from "../views/pages/AddPostByAdminComponent.vue";
import UpdatePostByAdminComponent from "../views/pages/UpdatePostByAdminComponent.vue";
import ShowPostsForAdminAndUserComponent from "../views/pages/ShowPostsForAdminAndUserComponent.vue";
import ShowSinglePostComponent from "../views/pages/ShowSinglePostComponent.vue";

import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "home",
    component: IndexComponent,
  },
  {
    path: "/charts",
    name: "charts",
    component: ChartsComponent,
    meta: { auth: true, user_type: "admin" },
  },
  {
    path: "/fullwidth",
    name: "fullwidth",
    component: FullWidthComponent,
    meta: { auth: true, user_type: "admin" },
  },
  {
    path: "/formbasic",
    name: "formbasic",
    component: FormBasicComponent,
    meta: { auth: true, user_type: "user" },
  },
  {
    path: "/formwizard",
    name: "formwizard",
    component: FormWizardComponent,
    meta: { auth: true, user_type: "user" },
  },
  {
    path: "/sign_up_admin",
    name: "sign_up_admin",
    component: SignUpAdminComponent,
    meta: { auth: false },
  },
  {
    path: "/sign_up_user",
    name: "sign_up_user",
    component: SignUpUserComponent,
    meta: { auth: false },
  },
  {
    path: "/log_in_admin",
    name: "log_in_admin",
    component: LogInAdminComponent,
    meta: { auth: false },
  },
  {
    path: "/log_in_user",
    name: "log_in_user",
    component: LogInUserComponent,
    meta: { auth: false },
  },
  {
    path: "/add_post_by_admin",
    name: "add_post_by_admin",
    component: AddPostByAdminComponent,
    meta: { auth: true, user_type: "user" },
  },
  {
    path: "/update_post_by_admin/:post_id",
    name: "update_post_by_admin",
    component: UpdatePostByAdminComponent,
    meta: { auth: true, user_type: "user" },
    props: true,
  },
  {
    path: "/show_posts_for_admin_and_user",
    name: "show_posts_for_admin_and_user",
    component: ShowPostsForAdminAndUserComponent,
    meta: { auth: true, user_type: "admin_and_user" },
  },
  {
    path: "/show_single_post/:post_id",
    name: "show_single_post",
    component: ShowSinglePostComponent,
    meta: { auth: true, user_type: "admin_and_user" },
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    component: Error403Component,
    name: "error403component",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  let user_data = store.state.authentication_module.user_data;
  let is_admin_authenticate = null;
  let is_user_authenticate = null;
  if (user_data.user_type == "admin" && user_data.token != "") {
    is_admin_authenticate = true;
  } else if (user_data.user_type == "user" && user_data.token != "") {
    is_user_authenticate = true;
  } else {
    is_admin_authenticate = false;
    is_user_authenticate = false;
  }
  //console.log(is_admin_authenticate);
  if (
    "auth" in to.meta &&
    "user_type" in to.meta &&
    to.meta.auth &&
    to.meta.user_type == "admin" &&
    !is_admin_authenticate
  ) {
    next("/");
  } else if (
    "auth" in to.meta &&
    "user_type" in to.meta &&
    to.meta.auth &&
    to.meta.user_type == "user" &&
    !is_user_authenticate
  ) {
    next("/");
  } else if (
    "auth" in to.meta &&
    "user_type" in to.meta &&
    to.meta.auth &&
    to.meta.user_type == "admin_and_user" &&
    !is_admin_authenticate &&
    !is_user_authenticate
  ) {
    next("/");
  } else if (
    "auth" in to.meta &&
    !to.meta.auth &&
    (is_admin_authenticate || is_user_authenticate)
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
