import api from "./api";
import qs from "qs";

const client = api.getInstance();

export default {
  /**
   * HTTP Call to fetch file data from search
   */
  validateCreditCard (info) {
    return client.get("/checkout/creditcard/validate", {
      params: {
        info: info
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to get a session for STRIPE
   */
  getStripeSession (lineItems, successUrl, cancelUrl) {
    return client.get("/checkout/stripe/session", {
      params: {
        successUrl: successUrl,
        cancelUrl: cancelUrl,
        lineItems: lineItems
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    }).then(response => response.data);
  },
  /**
   * HTTP Call to fetch file data from search
   */
  processPurchase (purchases, orderId, userId) {
    return client.post("/checkout/payment/complete", {
      purchases: JSON.stringify(purchases),
      orderId: orderId,
      userId: userId
    }).then(response => response.data);
  }
};
