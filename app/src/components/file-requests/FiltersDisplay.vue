<template>
  <div class="container">
    <div class="row request-specifications">
      <div v-if="filters.naicsCode" v-bind:class="filtersClass">
        <span>NAICS:</span>
        <span>{{ filters.naicsCode }}</span>
      </div>
      <div v-bind:class="filtersClass" v-if="filters.state || filters.zip">
        <span>Location:</span>
        <span>{{ filters.state | displayLocation(filters.zip) }}</span>
      </div>
      <div v-bind:class="filtersClass">
        <span>Period:</span>
        <span>{{ filters.date.from | displayPeriod(filters.date.to, requestDate) | displayDate }}</span>
      </div>
      <div v-bind:class="filtersClass" v-if="filters.amount.min || filters.amount.max">
        <span>Amount:</span>
        <span>{{ filters.amount.min | displayAmount(filters.amount.max) }}</span>
      </div>
      <div v-bind:class="filtersClass" v-if="filters.jobsReported.min || filters.jobsReported.max">
        <span>Jobs:</span>
        <span>{{ filters.jobsReported.min | displayJobs(filters.jobsReported.max) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "LoanFilterDisplay",
  components: {},
  props: ["filters", "requestDate"],
  data () {
    return {
      filtersClass: "col-lg-4 col-md-6 col-sm-12"
    };
  },
  computed: {},
  created () {
    // TODO: Better way?
    if (this.$route.path === "/file/requests") {
      this.filtersClass = "col-lg-12 col-md-12 col-sm-12";
    }
  },
  methods: {},
  watch: {},
  filters: {
    // Display location <state>, <zip>
    displayLocation: function (state, zip) {
      let value = "";
      if (state !== "") {
        value += state;
      }
      if (state !== "" && zip !== "") {
        value += ", ";
      }
      if (zip !== "") {
        value += zip;
      }
      return value;
    },
    // Display period as <from> - <to>
    displayPeriod: function (from, to, created) {
      if (from !== "" && to !== "") {
        return from + " - " + to;
      }
      if (from !== "" && to === "") {
        return from + " - " + created;
      }
      if (to !== "") {
        return "Until " + to;
      }
      return "Until " + created;
    },
    // Cut time of datetime
    displayDate: function (value) {
      return value.split("T")[0];
    },
    // Display amount as <min> - <max>
    displayAmount: function (min, max) {
      if (min !== "" && max !== "") {
        return "$" + min + "-$" + max;
      }
      if (min !== "") {
        return "More than $" + min;
      }
      if (max !== "") {
        return "Less than $" + max;
      }
      return "";
    },
    // Display jobs as <min> - <max>
    displayJobs: function (min, max) {
      if (min !== "" && max !== "") {
        return min + " to " + max;
      }
      if (min !== "") {
        return "More than " + min;
      }
      if (max !== "") {
        return "Less than " + max;
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
.request-specifications {
  div {
    span:nth-child(1) {
      font-weight: bold;
      margin-right: 5px;
    }
  }
}
</style>
