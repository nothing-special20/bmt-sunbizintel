import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import createLogger from "vuex/dist/logger";
import * as Cookies from "js-cookie";

// Modules
import modules from "@/store/modules";

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== "production";

// Persisted States
const userCookies = createPersistedState({
  key: "User",
  paths: ["User"],
  storage: {
    getItem: (key) => Cookies.get(key),
    setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true, sameSite: "strict" }),
    removeItem: (key) => Cookies.remove(key)
  }
});
const checkoutStorage = createPersistedState({
  key: "Checkout",
  paths: ["Checkout"]
});

const getDefaultState = () => {
  return { };
};

export default new Vuex.Store({
  strict: true,
  plugins: [
    userCookies,
    checkoutStorage
    // debug ? [createLogger()] : []
  ],
  state: getDefaultState(),
  modules: modules,
  getters: { },
  mutations: {
    RESET: state => {
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    RESET ({ commit }) {
      commit("RESET");
      // resets state of all the modules
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/RESET`);
      });
    }
  }
});
