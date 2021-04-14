import axios from "axios";
import config from "config";
import qs from "qs";

// export default () => {
//   return axios.create({
//     baseURL: config.apiURL
//   });
// };
const service = axios.create({
  baseURL: config.apiURL
});

export default {
  /**
   * HTTP Call for search
   *
   * @param data
   */
  search (data) {
    return service.get("/search", {
      params: {
        data: data
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    });
  },
  /**
   * HTTP Call to retrieve case information by ID
   *
   * @param id
   */
  retrieve (id) {
    return service.get("/retrieve", {
      params: {
        id: id
      }
    });
  },
  /**
   * HTTP Call to send a suggestion
   *
   * @param text
   */
  sendSuggestion (text) {
    return service.post("/suggest", {
      suggestion: text
    });
  },
  /**
   TEMP
   */
  test () {
    return service.get("/test").then(response => response.data);
  },
  /**
   * HTTP Call to fetch user subscriptions
   *
   * @param uid
   */
  fetchSubscriptions (uid) {
    return service.get("/subscriptions/retrieve", {
      params: {
        uid: uid
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to create user subscription
   *
   * @param data - Subscription Data
   */
  createSubscription (data) {
    return service.post("/subscriptions/new", {
      data: data
    }).then(response => response.data);
  },
  /**
   * HTTP Call to delete user subscription
   *
   * @param sid - Subscription ID
   */
  deleteSubscription (sid) {
    return service.post("/subscription/delete", {
      sid: sid
    }).then(response => response.data);
  },
  /**
   * HTTP Call to update subscription viewed
   *
   * @param uid
   */
  updateSubscription (sid) {
    return service.post("/subscription/update", {
      sid: sid
    }).then(response => response.data);
  },
  /**
   * HTTP Call to fetch number of records for subscription
   */
  fetchSubscriptionRecordCount (sid) {
    return service.get("/subscription/records/count", {
      params: {
        sid: sid
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to fetch individual subscription
   */
  fetchSubscriptionRecordsByPage (sid, limit, page, totalPages) {
    return service.get("/subscription/records/retrieve", {
      params: {
        sid: sid,
        limit: limit,
        page: page,
        totalPages: totalPages
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to download subscription data
   */
  downloadSubscriptionData (type, county) {
    return service.get("/subscription/download", {
      params: {
        type: type,
        county: county
      }
    }).then(response => response);
  },
  /**
   * HTTP Call to send user feedback
   */
  sendUserFeedback (job, industry, change, addition, other, email) {
    return service.post("/feedback", {
      job: job,
      industry: industry,
      change: change,
      addition: addition,
      other: other,
      email: email
    }).then(response => response.data);
  },
  /**
   * Get axios instance
   */
  getInstance () {
    return service;
  }
};
