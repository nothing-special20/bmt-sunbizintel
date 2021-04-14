/* user.store.js */
import ApiService from "@/http/api";
import AuthService from "@/http/auth";

// Initial State Object
const initialState = () => ({
  token: "",
  user: {}
});

// State object
const state = initialState();

// Getter functions
const getters = {
  isLoggedIn: state => {
    return state.token !== undefined && state.token !== "";
  },
  getToken: state => {
    return state.token;
  },
  getUser: state => {
    return state.user;
  },
  getUserId: state => {
    return state.user.uid;
  },
  getUsername: state => {
    return state.user.name;
  }
};

// Actions
const actions = {
  RESET ({ commit }) {
    commit("RESET");
  },
  /**
   * Perform login and set user
   */
  LOGIN: (context, credentials) => {
    return new Promise((resolve, reject) => {
      AuthService.login(credentials).then(response => {
        context.commit("SET_TOKEN", response.token);
        context.commit("SET_USER", response.user);
        console.log("SEtting headers...", response.token);
        // Set Auth Header
        ApiService.getInstance().defaults.headers.common.Authorization = `Bearer ${response.token}`;
        resolve(response);
      }).catch(error => {
        context.commit("RESET");
        reject(error);
      });
    });
  },
  /**
   * Perform logout
   */
  LOGOUT: (context) => {
    return new Promise((resolve, reject) => {
      context.commit("RESET", "");

      // Remove Auth Header
      delete ApiService.getInstance().defaults.headers.common.Authorization;
      resolve();
    });
  }
};

// Mutations
const mutations = {
  /**
   * Reset state of store
   */
  RESET: (state) => {
    // const newState = initialState();
    // Object.keys(newState).forEach(key => {
    //   state[key] = newState[key];
    // });
    Object.assign(state, initialState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
