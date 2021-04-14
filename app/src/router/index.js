import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

// Views
import Home from "../views/Home.vue";
import CheckoutOverview from "../views/checkout/Overview.vue";
import CheckoutSummary from "../views/checkout/Summary.vue";
import Subscription from "@/views/Subscription.vue";
import FileRequests from "@/views/FileRequests.vue";
import UserQuestions from "@/views/UserQuestions.vue";
import FileRequestHistory from "@/views/FileRequestHistory";
import Test from "../views/Test.vue";
import LoginView from "@/views/auth/LoginView.vue";
import Register from "@/views/auth/Register.vue";
import PasswordReset from "@/views/auth/PasswordReset.vue";
import EmailVerification from "@/views/auth/EmailVerification.vue";
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter);

const isAuthenticated = function (to, from, next) {
  // If logged in, continue
  if (store.getters["User/isLoggedIn"]) {
    next();
    return;
  }
  // Redirect to login
  next("/login");
};

const notAuthenticated = function (to, from, next) {
  // If not logged in, continue
  if (!store.getters["User/isLoggedIn"]) {
    next();
    return;
  }
  // Redirect
  next("/");
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
    beforeEnter: notAuthenticated
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    beforeEnter: notAuthenticated,
    props: route => ({ query: route.query.msg })
  },
  {
    path: "/password/reset/:uid/:hash",
    name: "PasswordReset",
    component: PasswordReset,
    beforeEnter: notAuthenticated
  },
  {
    path: "/user/verification/verify-account/:uid/:hash",
    name: "EmailVerification",
    component: EmailVerification,
    beforeEnter: notAuthenticated
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: isAuthenticated
  },
  {
    path: "/checkout",
    name: "CheckoutOverview",
    component: CheckoutOverview,
    beforeEnter: isAuthenticated
  },
  {
    path: "/checkout/success",
    name: "CheckoutSummary",
    component: CheckoutSummary,
    beforeEnter: isAuthenticated,
    props: route => ({ query: route.query.id })
  },
  {
    path: "/subscription",
    name: "subscription",
    component: Subscription,
    beforeEnter: isAuthenticated,
    props: route => ({ query: route.query.index })
  },
  {
    path: "/file/requests",
    name: "FileRequests",
    component: FileRequests,
    beforeEnter: isAuthenticated
  },
  {
    path: "/feedback",
    name: "UserQuestions",
    component: UserQuestions
  },
  {
    path: "/file/requests/history",
    name: "FileRequestHistory",
    component: FileRequestHistory,
    beforeEnter: isAuthenticated
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
