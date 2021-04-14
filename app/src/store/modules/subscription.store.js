/* Subscription.store.js */
import ApiService from "@/http/api";

// Initial State Object
const initialState = () => ({
  subscriptions: [],
  recordCount: undefined,
  records: []
});

// State object
const state = initialState();

// Getter functions
const getters = {
  getSubscriptions: state => {
    return state.subscriptions;
  },
  getRecordCount: state => {
    return state.recordCount;
  },
  getRecords: state => {
    return state.records;
  }
};

// Actions
const actions = {
  RESET ({ commit }) {
    commit("RESET");
  },
  /**
   * Retrieve and set user subscriptions
   */
  RETRIEVE_SUBSCRIPTIONS: (context, uid) => {
    return new Promise((resolve, reject) => {
      ApiService.fetchSubscriptions(uid).then(response => {
        context.commit("SET_SUBSCRIPTIONS", response);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
   * Create new subscription
   */
  CREATE: (context, data) => {
    return new Promise((resolve, reject) => {
      ApiService.createSubscription(data).then(response => {
        // Retrieve new subscription list
        context.dispatch("RETRIEVE_SUBSCRIPTIONS", data.uid);
        resolve(response);
      }).catch(error => { reject(error); });
    });
  },
  /**
   * Delete subscription
   */
  DELETE: (context, { sid, uid }) => {
    return new Promise((resolve, reject) => {
      ApiService.deleteSubscription(sid).then(response => {
        // Retrieve new subscription list
        context.dispatch("RETRIEVE_SUBSCRIPTIONS", uid);
        resolve(response);
      }).catch(error => { reject(error); });
    });
  },
  /**
   * Update subscription viewed
   */
  UPDATE: (context, index) => {
    ApiService.updateSubscription(context.state.subscriptions[index].sid).catch(error => {
      console.log(error);
    });
  },
  /**
   * Retrieve and set subscription record count
   */
  RETRIEVE_SUBSCRIPTION_RECORD_COUNT: (context, sid) => {
    return new Promise((resolve, reject) => {
      // Get number of records
      ApiService.fetchSubscriptionRecordCount(sid).then(response => {
        context.commit("SET_RECORD_COUNT", response);
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  /**
   * Retrieve and set subscription cases
   */
  RETRIEVE_SUBSCRIPTION_RECORDS_BY_PAGE: (context, { sid, limit, page, totalPages }) => {
    return new Promise((resolve, reject) => {
      // Get page of records
      ApiService.fetchSubscriptionRecordsByPage(sid, limit, page, totalPages).then(response => {
        context.commit("SET_RECORDS", response);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
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
  SET_SUBSCRIPTIONS (state, value) {
    state.subscriptions = value;
  },
  SET_RECORD_COUNT (state, value) {
    state.recordCount = value;
  },
  SET_RECORDS (state, value) {
    state.records = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
