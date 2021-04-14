/* Subscription.store.js */
import ApiService from "@/http/file-request";

// // TODO: remove
// const n = {
//   naics: "",
//   state: "CA",
//   zip: "90201",
//   date: {
//     from: "",
//     to: "2020-05-20"
//   },
//   amount: {
//     min: "1000",
//     max: ""
//   },
//   jobs: {
//     min: "1",
//     max: "3"
//   }
// };

// Initial State Object
const initialState = () => ({
  initialDisplay: true,
  entries: [],
  price: 0,
  downloadFilters: {},
  history: []
});

// State object
const state = initialState();

// Getter functions
const getters = {
  getInitialDisplay: state => {
    return state.initialDisplay;
  },
  getEntries: state => {
    return state.entries;
  },
  getPrice: state => {
    return state.price;
  },
  getDownloadFilters: state => {
    return state.downloadFilters;
  },
  getHistory: state => {
    return state.history;
  }
};

// Actions
const actions = {
  RESET ({ commit }) {
    commit("RESET");
  },
  /**
   * QUERY for File Request Info
   */
  QUERY_FILE_INFO: (context, filters) => {
    // Save Download Filters
    context.commit("SAVE_FILTERS", filters);

    // Toggle initial display
    context.commit("SET_INITIAL_DISPLAY", false);

    return new Promise((resolve, reject) => {
      // Send HTTP query
      ApiService.getFileRequestData(filters).then(response => {
        context.commit("SET_RESULT", response);
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  },
  GET_HISTORY: (context, user) => {
    return new Promise((resolve, reject) => {
      // Send HTTP query
      ApiService.fetchUserFileRequestHistory(user).then(response => {
        context.commit("SET_HISTORY", response);
      }).catch(err => {
        reject(err);
      });
    });
  },
  TOGGLE_INITIAL_DISPLAY: (context) => {
    context.commit("SET_INITIAL_DISPLAY", !context.state.initialDisplay);
  }
};

// Mutations
const mutations = {
  /**
   * Reset state of store
   */
  RESET: (state) => {
    Object.assign(state, initialState());
  },
  SET_RESULT (state, value) {
    state.entries = value.entries;
    state.price = value.price;
  },
  SAVE_FILTERS (state, value) {
    state.downloadFilters = value;
  },
  SET_HISTORY (state, value) {
    state.history = value;
  },
  SET_INITIAL_DISPLAY (state, value) {
    state.initialDisplay = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
