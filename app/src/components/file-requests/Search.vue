<template>
  <div id="file-request-search">
    <div class="container">
      <h4>Request PPP Loan Data</h4>
      <div id="search-display-error">{{ searchError }}</div>
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="state-search-item">State:</label>
            <select id="state-search-item" class="form-control" aria-label="State" v-model="filters.state">
              <option value="">All States and Territories</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
              <option value="">--------------</option>
              <option value="AS">America Samoa</option>
              <option value="GU">Guam</option>
              <option value="MH">Marshall Islands</option>
              <option value="FM">Micronesia</option>
              <option value="MP">Northern Mariana Islands</option>
              <option value="PW">Palau</option>
              <option value="PR">Puerto Rice</option>
              <option value="VI">Virgin Islands</option>
            </select>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="zip-search-item">Zip:</label>
            <input id="zip-search-item" class="form-control" aria-label="Zip" v-model="filters.zip" type="text" />
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="naics-search-item">NAICS:</label>
        <input id="naics-search-item" class="form-control" type="text" v-model="filters.naics" />
      </div>
      <!-- Job Search Boxes -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="min-jobs-reported-search-item">Min Jobs Reported:</label>
            <input id="min-jobs-reported-search-item" class="form-control" type="text" v-model="filters.jobsReported.min" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="max-jobs-reported-search-item">Max Jobs Reported:</label>
            <input id="max-jobs-reported-search-item" class="form-control" type="text" v-model="filters.jobsReported.max" />
          </div>
        </div>
      </div>
      <!-- Date Search Boxes -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="from-date-input">Loan Date Start Range:</label>
            <b-input-group class="mb-3">
              <b-form-input
                id="from-date-input"
                v-model="filters.date.from"
                :state="filterStates.date.from"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="filters.date.from"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="from-date-input"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="to-date-input">Loan Date End Range:</label>
            <b-input-group class="mb-3">
              <b-form-input
                id="to-date-input"
                v-model="filters.date.to"
                :state="filterStates.date.to"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="filters.date.to"
                  button-only
                  right
                  locale="en-US"
                  aria-controls="to-date-input"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
      </div>
      <!-- Amount Search Boxes -->
      <div class="row">
        <div class="col-sm-6">
          <div class="form-group">
            <label for="min-amount-search-item">Min Loan Amount:</label>
            <input id="min-amount-search-item" class="form-control" type="text" v-model="filters.amount.min" />
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group">
            <label for="max-amount-search-item">Max Loan Amount:</label>
            <input id="max-amount-search-item" class="form-control" type="text" v-model="filters.amount.max" />
          </div>
        </div>
      </div>
      <button class="btn btn-primary" v-on:click="onSearchClick">Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "FileRequestSearch",
  components: { },
  data () {
    return {
      searchError: "",
      filters: {
        naics: "",
        state: "",
        zip: "",
        date: {
          from: "",
          to: ""
        },
        jobsReported: {
          min: "",
          max: ""
        },
        amount: {
          min: "",
          max: ""
        }
      },
      result: {
        entries: 0,
        price: "0"
      },
      filterStates: {
        date: {
          from: null,
          to: null
        }
      }
    };
  },
  methods: {
    onSearchClick () {
      // Reset search Error
      this.searchError = "";

      this.$store.dispatch("FileRequest/QUERY_FILE_INFO", JSON.parse(JSON.stringify(this.filters))).catch(err => {
        // this.searchError = err.response.data.msg;
        console.log(err);
      });
    },
    dateValid (date) {
      const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      if (!dateRegex.test(date)) {
        return false;
      }
      return true;
    },
    datesValid () {
      if (this.filters.date.min !== "" && !this.dateValid(this.filters.date.min)) {
        return false;
      }
      if (this.filters.date.max !== "" && this.dateValid(this.filters.date.max)) {
        return false;
      }
      return true;
    }
  },
  watch: {
    // Watcher on from date filter
    "filters.date.from": function (newVal, oldVal) {
      if (newVal === "") {
        this.filterStates.date.from = null;
      } else if (this.dateValid(newVal) === false) {
        this.filterStates.date.from = false;
      } else {
        this.filterStates.date.from = true;
      }
    },
    // Watcher on to date filter
    "filters.date.to": function toDate (newVal, oldVal) {
      if (newVal === "") {
        this.filterStates.date.min = null;
      } else if (!this.dateValid(newVal)) {
        this.filterStates.date.to = false;
      } else {
        this.filterStates.date.to = true;
      }
    }
  }
};
</script>

<style lang="scss">
#file-request-search {
  margin-top: 10px;
  margin-bottom: 10px;

  h4 {
    font-weight: bold;
  }

  #search-display-error {
    color: red;
  }

  .form-group {
    text-align: left;

    label:nth-child(1) {
      font-weight: bold;
    }
  }
}
</style>
