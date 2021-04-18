/* checkout.store.js */
import ApiService from "@/http/checkout";

// Initial State Object
const initialState = () => ({
  items: [],
  purchases: []
});

/**
 * Total price of items
 */
function total (items) {
  let total = 0.00;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total.toFixed(2);
}

// State object
const state = initialState();

// Getter functions
const getters = {
  getItems: state => {
    return state.items;
  },
  getItemCount: state => {
    return state.items.length;
  },
  getCartTotal: state => {
    return total(state.items);
  },
  getPurchases: state => {
    return state.purchases;
  },
  getPurchaseTotal: state => {
    return total(state.purchases);
  }
};

// Actions
const actions = {
  RESET ({ commit }) {
    commit("RESET");
  },
  ADD_TO_CART: (context, { filters, count, price }) => {
    if (filters === undefined || price === 0) {
      throw Error("No data provided for checkout.");
    }

    context.commit("ADD_ITEM", {
      name: "FL_CLERK_CSV",
      data: JSON.stringify(filters),
      recordCount: count,
      price: Math.round((price + Number.EPSILON) * 100) / 100
    });
  },
  REMOVE_FROM_CART: (context, index) => {
    context.commit("REMOVE_ITEM", index);
  },
  GET_STRIPE_SESSION: (context, { lineItems, successUrl, cancelUrl }) => {
    return new Promise((resolve, reject) => {
      // Get STRIPE session before redirecting to checkout
      ApiService.getStripeSession(lineItems, successUrl, cancelUrl).then(response => {
        // Save off cart
        context.commit("SET_PURCHASES");

        resolve(response);
      }).catch(err => reject(err));
    });
  },
  PROCESS_PURCHASE: (context, { purchases, orderId, userId }) => {
    return new Promise((resolve, reject) => {
      // Clear out checkout cart
      context.commit("CLEAR_CART");

      ApiService.processPurchase(purchases, orderId, userId).then(() => {
        resolve();
      }).catch(err => reject(err));
    });
  },
  CHECKOUT_COMPLETE: (context) => {
    context.commit("CLEAR_PURCHASES");
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
  ADD_ITEM (state, value) {
    state.items.push(value);
  },
  REMOVE_ITEM (state, index) {
    state.items.splice(index, 1);
  },
  SET_CART (state, value) {
    state.items = value;
  },
  CLEAR_CART (state) {
    state.items = [];
  },
  SET_PURCHASES (state) {
    state.purchases = state.items;
  },
  CLEAR_PURCHASES (state) {
    state.purchases = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
