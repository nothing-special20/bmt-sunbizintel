<template>
  <div id="checkout-summary" class="container-fluid">
    <div class="row">
      <div id="checkout-summary-msg" class="col-lg-11 offset-lg-1">
        {{ msg }}
        <span v-if="responseReceived">
          Download in
          <router-link to="/file/requests/history">File History</router-link>
        </span>
      </div>
      <!-- Items in Cart -->
      <div class="col-lg-6 offset-lg-1">
        <div class="container cart-list">
          <div class="cart-list-title">
            <h3>Items</h3>
          </div>
          <!-- Items -->
          <div v-for="(item, index) in items" :key="index"  class="row cart-item">
            <div class="container row">
              <div class="col-lg-11">
                <div class="container">
                  <div class="row">
                    <!--<input v-bind:id="`ci-${index}`" type="radio" class="with-font" value="sel" />-->
                    <label>{{ item.name }}</label>
                    <span class="col-lg-1 cart-item-price">{{ item.price | formatPrice }}</span>
                  </div>
                  <p class="cart-item-text">
                    <FiltersDisplay :filters="item.specifications" :requestDate="item.requestDate"/>
                  </p>
                </div>
              </div>
              <div class="col-lg-1 purchase-download">
                <FileRequestDownload :request="item" ref="downloadCallback" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Total / Payment Info -->
      <div id="purchase-details" class="col-lg-3 offset-lg-1">
        <div class="card card-cascade shadow mb-5 ">
          <!--Card Body-->
          <div class="card-body card-body-cascade">
              <!--Card Description-->
              <div class="purchase-summary">
                  <p><strong>Purchase Details</strong></p>
                  <p>Qty<span class="float-right">{{ items.length }}</span></p>
                  <p class="total">
                    <strong>Total</strong>
                    <span class="float-right">$<span>{{ total }}</span></span>
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FiltersDisplay from "@/components/file-requests/FiltersDisplay";
import FileRequestDownload from "@/components/file-requests/FileRequestDownload";

export default {
  name: "CheckoutSummary",
  components: { FiltersDisplay, FileRequestDownload },
  computed: {
    items () {
      // Convert parameters to object
      return this.$store.getters["Checkout/getPurchases"].map((request) => {
        const obj = {};
        Object.assign(obj, request);
        obj.specifications = JSON.parse(request.data);
        obj.requestDate = this.getDate();
        return obj;
      });
    },
    total () {
      return this.$store.getters["Checkout/getPurchaseTotal"];
    }
  },
  data () {
    return {
      msg: "",
      responseReceived: false
    };
  },
  created () {},
  mounted () {
    this.$store.dispatch("Checkout/PROCESS_PURCHASE", {
      purchases: this.items,
      orderId: this.$route.query.id,
      userId: this.$store.getters["User/getUserId"]
    }).then(() => {
      this.responseReceived = true;
    }).catch(err => {
      this.msg = err.response.data.msg;
      this.responseReceived = true;
    });
  },
  methods: {
    getDate () {
      return (new Date()).toISOString().split("T")[0];
    },
    downloadCallback (err) {
      this.msg = err;
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
  },
  destroyed () {
    // Clear checkout purchases on page close
    this.$store.dispatch("Checkout/CHECKOUT_COMPLETE");
  }
};
</script>

<style lang="scss">
#checkout-summary {
  margin-top: 10px;
  text-align: left;

  #checkout-summary-msg {
    font-size: 20px;
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

    .purchase-download {
      color: darkgray;
      font-size: 24px;
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

  #purchase-details {

    .purchase-summary {
      margin: 5%;
      font-size: 25px;
    }

    .card-body {
      padding: 0rem;
    }
  }
}
</style>
