<template>
  <div id="subscription-container" class="container-fluid">
    <div class="row">
      <octicon name="arrow-left" scale="1.5"></octicon>
      <router-link to="/dashboard#subscriptions">Dashboard</router-link>
    </div>
    <div class="row">
      <div class="col-md-8">
        <h3>
          <span>County:</span>
          <span>{{ subscription.county }}</span>
          <span>Type:</span>
          <span>{{ subscription.type }}</span>
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-1">
        <button class="btn btn-primary" title="Download CSV" data-toggle="tooltip" v-on:click="onDownloadClick()">Download</button>
      </div>
      <div class="col-md-2 offset-md-6">
        <label for="num-records-per-page-select">Per Page:</label>
        <select id="num-records-per-page-select" class="form-select" aria-label="Number of Records per page" v-model="numRecordsPerPage">
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div class="col-md-2">
        <b-pagination v-model="currentPage" :total-rows="rows" :per-page="numRecordsPerPage" aria-controls="records-table"></b-pagination>
      </div>
    </div>
    <b-table show-empty id="records-table" striped hover :items="records" :fields="fields" :per-page="0" :current-page="currentPage"></b-table>
    <div></div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/api";

export default {
  name: "Subscription",
  props: [],
  components: {},
  computed: {
    // Current page of records
    records () {
      return this.$store.getters["Subscription/getRecords"];
    },
    // Total number of records
    rows () {
      return this.$store.getters["Subscription/getRecordCount"];
    },
    // Total Pages in table
    totalPages () {
      return Math.ceil(this.rows / this.numRecordsPerPage);
    }
  },
  data () {
    return {
      numRecordsPerPage: 25,
      currentPage: 1,
      fields: ["LOANNUMBER", "DATEAPPROVED", "SBAOFFICECODE", "PROCESSINGMETHOD", "BORROWERNAME", "BORROWERADDRESS", "BORROWERCITY", "BORROWERSTATE", "BORROWERZIP", "LOANSTATUSDATE", "LOANSTATUS", "TERM", "SBAGUARANTYPERCENTAGE", "INITIALAPPROVALAMOUNT", "CURRENTAPPROVALAMOUNT", "UNDISBURSEDAMOUNT", "FRANCHISENAME", "SERVICINGLENDERLOCATIONID", "SERVICINGLENDERNAME", "SERVICINGLENDERADDRESS", "SERVICINGLENDERCITY", "SERVICINGLENDERSTATE", "SERVICINGLENDERZIP", "RURALURBANINDICATOR", "HUBZONEINDICATOR", "LMIINDICATOR", "BUSINESSAGEDESCRIPTION", "PROJECTCITY", "PROJECTCOUNTYNAME", "PROJECTSTATE", "PROJECTZIP", "CD", "JOBSREPORTED", "NAICSCODE", "RACEETHNICITY", "UTILITIES_PROCEED", "PAYROLL_PROCEED", "MORTGAGE_INTEREST_PROCEED", "RENT_PROCEED", "REFINANCE_EIDL_PROCEED", "HEALTH_CARE_PROCEED", "DEBT_INTEREST_PROCEED", "BUSINESSTYPE", "ORIGINATINGLENDERLOCATIONID", "ORIGINATINGLENDER", "ORIGINATINGLENDERCITY", "ORIGINATINGLENDERSTATE", "GENDER", "VETERAN", "NONPROFIT"],
      subscription: {}
    };
  },
  async created () {
    // Get subscription data
    this.subscription = this.$store.getters["Subscription/getSubscriptions"][this.$route.query.index];
    // Fetch subscriptions
    this.$store.dispatch("Subscription/RETRIEVE_SUBSCRIPTION_RECORD_COUNT", this.subscription.sid, this.numRecordsPerPage, this.currentPage).then(data => {
      this.resetTable();
    }).catch((error) => {
      console.log(error); // TODO: Redirect to error page
    });
  },
  methods: {
    onDownloadClick () {
      ApiService.downloadSubscriptionData(this.subscription.type, this.subscription.county).then(response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${this.subscription.type}-${this.subscription.county}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(console.error);
    },
    getPageRecords (nextPage) {
      this.$store.dispatch("Subscription/RETRIEVE_SUBSCRIPTION_RECORDS_BY_PAGE",
        { sid: this.subscription.sid, limit: this.numRecordsPerPage, page: nextPage, totalPages: this.totalPages }).catch(err => {
        // Errors
        // TODO: Redirect to error page
        console.log(err);
      });
    },
    resetTable () {
      this.getPageRecords(1);
    }
  },
  watch: {
    currentPage: {
      handler: function (value) {
        // Get new page records
        this.getPageRecords(value);
      }
    },
    numRecordsPerPage () {
      // On change reset table to first page
      this.getPageRecords(1);
    }
  }
};
</script>

<style lang="scss">
#subscription-container {
  div:nth-child(1) {
    margin-top: 5px;
    margin-left: 5px;

    a {
      margin-left: 5px;
      color: black;
      font-weight: bold;
    }
    a:hover {
      color: lightgray;
    }
  }

  label {
    margin-right: 5px;
  }

  h3 {
    margin-left: 10px;

    span {
      margin-right: 10px;
    }
    span:nth-child(1),
    span:nth-child(3){
      font-weight: bold;
    }
    span:nth-child(2) {
      margin-right: 15px;
    }
  }

}
</style>
