<template>
  <div id="checkout-summary" class="container-fluid">
    <div class="row">
      <!-- Error Message -->
      <div id="checkout-overview-msg" v-if="msg" class="col-lg-12">
        {{ msg }}
      </div>
      <!-- Items in Cart -->
      <div class="col-lg-9">
        <div class="container cart-list">
          <div class="cart-list-title">
            <h3>Cart Items</h3>
          </div>
          <!-- Items -->
          <div v-for="(item, index) in cartItems" :key="index"  class="row cart-item">
            <div class="container row">
              <div class="col-lg-11">
                <div class="container">
                  <div class="row">
                    <label>{{ item.name }}</label>
                    <span class="col-lg-1 cart-item-price">{{ item.price | formatPrice }}</span>
                  </div>
                  <p class="cart-item-text">
                    <FiltersDisplay :filters="JSON.parse(item.data)" :requestDate="getDate()"/>
                  </p>
                </div>
              </div>
              <div class="col-lg-1 cart-delete" v-on:click="deleteFromCart(index)">
                <octicon name="trashcan" scale="1.5" style="height:100%;"></octicon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Overview Page Total -->
      <div id="total-column" class="col-lg-3">
        <div class="">
          <div class="order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Overview</span>
              <span class="badge badge-secondary badge-pill">{{ cartItems.length }}</span>
            </h4>
          </div>
          <div class="">
            <ul class="list-group mb-3 sticky-top">
              <li class="list-group-item d-flex justify-content-between" v-for="(item, index) in cartItems" :key="index">
                <h6 class="my-0">{{ item.name }}</h6>
                <span class="text-muted">{{ item.price | formatPrice }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>{{ total }}</strong>
              </li>
            </ul>
          </div>
          <button v-if="this.cartItems.length > 0" :disabled="btnLocked" class="btn btn-primary btn-block" v-on:click="onCheckoutClick()">Checkout</button>
        </div>
      </div>
    </div>
    <!-- Stripe Checkout Container -->
    <stripe-checkout ref="checkoutRef" :pk="pubKey" :session-id="sessionId" />
  </div>
</template>

<script>
// @ is an alias to /src
import { StripeCheckout } from "@vue-stripe/vue-stripe";
import FiltersDisplay from "@/components/file-requests/FiltersDisplay";

export default {
  name: "CheckoutOverview",
  components: { StripeCheckout, FiltersDisplay },
  computed: {
    cartItems () {
      return this.$store.getters["Checkout/getItems"];
    },
    total () {
      return this.$store.getters["Checkout/getCartTotal"];
    }
  },
  data () {
    return {
      msg: "",
      btnLocked: false,
      sessionId: "",
      pubKey: "",
      successURL: "http://sunshineanalytics.io/checkout/success?id={CHECKOUT_SESSION_ID}",
      cancelURL: "http://sunshineanalytics.io/checkout"
    };
  },
  methods: {
    getDate () {
      return (new Date()).toISOString().split("T")[0];
    },
    // Build line items for STRIPE item list
    getLineItems () {
      return this.cartItems.map((item) => {
        return {
          price_data: {
            currency: "USD",
            product_data: {
              name: item.name
            },
            // Force to 2 decimals * 100
            unit_amount: Math.round((item.price + Number.EPSILON) * 100)
          },
          quantity: 1
        };
      });
    },
    deleteFromCart (index) {
      this.$store.dispatch("Checkout/REMOVE_FROM_CART", index);
    },
    onCheckoutClick () {
      if (this.cartItems.length === 0) {
        return;
      }

      // Lock checkout button
      this.btnLocked = true;

      // Reset error message
      this.msg = "";

      // Get STRIPE session before redirecting to checkout
      this.$store.dispatch("Checkout/GET_STRIPE_SESSION", {
        lineItems: this.getLineItems(),
        successUrl: this.successURL,
        cancelUrl: this.cancelURL
      }).then(response => {
        this.sessionId = response.session.id;
        this.pubKey = response.key;
      }).then(() => {
        // You will be redirected to Stripe's secure checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      }).catch(err => {
        this.msg = err.response.data.msg;
        this.btnLocked = false;
      });
    }
  },
  filters: {
    // Display price as $0.00
    formatPrice (value) {
      if (value !== undefined) {
        return "$" + value.toFixed(2);
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
#checkout-summary {
  margin-top: 10px;
  text-align: left;

  #checkout-overview-msg {
    text-align: center;
    color: red;
  }

  h3 {
      margin-bottom: 30px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 700;
      color: #094bde;
      letter-spacing: 2px;
    }

  .cart-list {
    background-color: #fff;
    /*border-radius: 8px;
    border: 2px solid #e9ebef;*/
    padding: 50px;
    margin-bottom: 40px;
    text-align: left;

    .cart-list-title {
      margin-bottom: 35px;
      border-bottom: 2px solid #e9ebef;
    }
  }
  .cart-item {
    border-bottom: 2px solid #e9ebef;
    padding-bottom: 25px;
    margin-bottom: 35px;

    &:last-child {
      border-bottom: 0px;
      margin-bottom: 0px;
      padding-bottom: 0px;
    }

    div:nth-child(1) {
      position: relative;

      label {
        padding-left: 35px;
        font-size: 20px;
        margin-bottom: 15px;
        font-weight: 400;
      }
    }
  }
  .cart-item-text {
    padding-left: 35px;
  }
  .cart-item-price {
    position: absolute;
    right: 0px;
    color: #094bde;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -1px;
    line-height: 1.5;
  }
  .cart-delete {
    color: red;
    text-align: center;

    &:hover {
      color: orange;
      cursor: pointer;
    }
  }
  #total-column {
    border-left: 2px solid #e9ebef;

    div:nth-child(1) {
      margin-top: 20px;
    }
  }

  #credit-card-input {
    text-align: left;

    .form-group {
      width: 100%;
    }
  }
}
</style>
