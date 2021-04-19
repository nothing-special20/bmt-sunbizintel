<template>
  <div id="file-request-page">
    <div class="row md-8">
      <div id="instruction-text" class="container col-md-4" style="height:200%;">
        <h3>How to Get Your Data:</h3>
        <span><b>Note: </b>Steps 1-6 are optional (though recommended!)</span>
        <ol>
          <li>Select a state or territory (or leave as "All States or Territories")</li>
          <li>Select a zip code (<b>optional</b>)</li>
          <li>Select an industry code NAICS (<b>optional</b>, <a href="https://www.naics.com/six-digit-naics/?code=54">see industry codes</a>)</li>
          <li>Input a range for number of jobs reported on the PPP loan application</li>
          <li>Enter a range for the loan dates</li>
          <li>Enter a range for the loan amount</li>
          <li>Click Submit and wait for the number of entries to calculate</li>
          <li>Click "Add Data to Cart"</li>
          <li>Repeat steps 1-8 if you would like additional data</li>
          <li>Click "Proceed to Checkout"</li>
          <li>Proceed to the cart screen, verify items, then click "Checkout"</li>
        </ol>
      </div>
      <div class="container col-md-5" style="height:200%;">
        <iframe height="515" src="https://www.loom.com/embed/5e49dcf176934ea59b08ffdb61a6c3c4"></iframe>
      </div>
    </div>
    <div class="row">
      <div class="container header">
        <div class="row">
          <div class="col-md-9">
            <h3>Request File:</h3>
          </div>
          <div class="col-md-1">
            <button class="btn btn-alternative" v-on:click="onFullBtnClick">Down File</button>
          </div>
          <div v-if="!initialDisplay" class="col-md-2">
            <button class="btn btn-main" v-on:click="navigateToHistoryView()">History</button>
          </div>
          <div class="col-md-12 error">
            {{ displayError }}
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div id ="search-display" class="col-md-5 request-component">
           <Search />
          </div>
          <!-- History Component Box -->
          <div id="history-display" class="col-md-5 offset-md-1 request-component" v-if="initialDisplay" v-on:click="navigateToHistoryView()">
            <History />
          </div>
          <div id="result-display" class="col-md-5 offset-md-1 request-component" v-if="!initialDisplay">
            <Result />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import DatePicker from "vue2-datepicker";
import History from "@/components/file-requests/History";
import Result from "@/components/file-requests/Result";
import Search from "@/components/file-requests/Search";
import ApiService from "@/http/file-request";

export default {
  name: "FileRequests",
  components: { History, Result, Search },
  data () {
    return {
      displayError: ""
    };
  },
  computed: {
    initialDisplay () {
      return this.$store.getters["FileRequest/getInitialDisplay"];
    }
  },
  methods: {
    navigateToHistoryView () {
      this.$router.push({ name: "FileRequestHistory" });
    },
    onSampleBtnClick () {
      this.displayError = "";

      ApiService.getSampleFile().then(response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "sample.csv";
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(err => {
        this.displayError = err.response.data.msg;
      });
    },
    onFullBtnClick () {
      this.displayError = "";

      ApiService.getFullFile().then(httpQuery, response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "fl_county_clerk.csv";
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(err => {
        this.displayError = err.response.data.msg;
      });
    }
  }
};
</script>

<style lang="scss">
#file-request-page {
  margin-top: 10px;

  .header {
    h3 {
      text-align: left;
    }
    a {
      text-align: right;
    }
  }

  .error {
    color: red;
  }

  .btn-main {
    background-color: #343a40;
    color: white;

    &:hover {
      background-color: #71a3d5;
    }
  }

  .btn-alternative {
    background-color: Transparent;
    background-repeat:no-repeat;
    overflow: hidden;
    outline:none;
    border-radius: 4px;
    border: 2px solid #343a40;

    &:hover {
      border-color: #71a3d5;
    }
  }

  #search-display {
    border-radius: 25px;
    border: 2px solid lightgray;
  }

  #history-display:hover {
    cursor: pointer;
    border-right: 2px solid orange;

    h4 {
      color: orange;
    }
  }

  .request-component {
    margin: 0 5 0 5;
  }

  #instruction-text {
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
}
</style>
