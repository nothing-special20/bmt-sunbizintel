<template>
  <div id="file-request-page">
    <div class="row md-8">
      <div id="instruction-text" class="container col-md-4" style="height:200%;">
        <h3>How to Get Your Data:</h3>
        <ul>
          <li><strong>Note</strong>: all filters are optional (though recommended!)</li>
        </ul>
        <ol>
          <li>Select a county, case type, and / or party type using the dropdown menus.</li>
          <li>Select one of the other filters by including a term or phrase that you would like to search for. The query will return all results where that exact phrase is contained within that field.
            <br>Example: searching for "LLC" under party name will include all results where "LLC" is included anywhere in the party name.
          </li>
          <li>Dates must be formatted "YYYY-MM-DD"</li>
        </ol>
      </div>
      <div class="container col-md-5" style="height:200%;">
        <iframe height="515" src=""></iframe>
      </div>
    </div>
    <div class="row">
      <div class="container header">
        <div class="row">
          <div class="col-md-9">
            <h3>Request File:</h3>
          </div>
          <div class="col-md-1">
            <!--<button class="btn btn-alternative" v-on:click="onSampleBtnClick">Download File</button>-->
          </div>
          <div class="col-md-12 error">
            {{ displayError }}
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div id ="search-display" class="col-md-5 request-component">
           <FLClerkSearch />
          </div>
          <!-- History Component Box -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import DatePicker from "vue2-datepicker";
import FLClerkSearch from "@/components/file-requests/FLClerkSearch";
// import ApiService from "@/http/file-request";

export default {
  name: "FileRequests",
  components: { FLClerkSearch },
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
    }
    // onSampleBtnClick () {
    //   this.displayError = "";
    //   this.$store.dispatch("FileRequest/SAMPLE_FILE)
    //   ApiService.getSampleFile().then().catch(err => {
    //     this.displayError = err.response.data.msg;
    //   });
    // }
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
