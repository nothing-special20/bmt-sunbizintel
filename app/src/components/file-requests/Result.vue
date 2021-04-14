<template>
  <div id="file-request-result">
    <div class="container">
      <h4>Projected Document</h4>
      <div class="form-group">
        <label for="num-entries-result">Entries:</label>
        <div id="num-entries-result" class="form-control">{{ entries }}</div>
      </div>
      <div class="form-group">
        <label for="price-result">Price:</label>
        <div id="price-result" class="form-control">{{ price }}</div>
      </div>
      <button class="btn btn-primary btn-block" v-on:click="addToCart()">Add Data to Cart</button>
      <br>
      <a class="btn btn-primary btn-block" v-on:click="onCheckoutClick()">Proceed to Checkout</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "FileRequestResult",
  components: { },
  data () {
    return {
      displayError: ""
    };
  },
  computed: {
    entries () {
      return this.$store.getters["FileRequest/getEntries"];
    },
    price () {
      return this.$store.getters["FileRequest/getPrice"];
    },
    downloadFilters () {
      return this.$store.getters["FileRequest/getDownloadFilters"];
    }
  },
  created () { },
  methods: {
    onCheckoutClick () {
      this.$router.push("/checkout");
    },
    addToCart () {
      this.$store.dispatch("Checkout/ADD_TO_CART", {
        filters: this.downloadFilters,
        count: this.entries,
        price: this.price
      });
    }
  },
  destroyed () {
    this.$store.dispatch("FileRequest/TOGGLE_INITIAL_DISPLAY");
  }
};
</script>

<style lang="scss">
#file-request-result {
  margin-top: 10px;
  margin-botton: 10px;

  h4 {
    font-weight: bold;
  }

  .form-group {
    text-align: left;

    label:nth-child(1) {
      font-weight: bold;
    }
  }
}
</style>
