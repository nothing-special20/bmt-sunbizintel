<template>
  <div id="file-request-history">
    <div class="container">
      <h4>File Request History</h4>
      <div class="row">{{ displayError }}</div>
      <div class="row">
        <div class="col-lg-12" v-for="req in historyRequests" :key="req.id">
          <div class="card">
            <div class="container">
              <div class="row">
                <div class="col-lg-10 col-sm-9 col-8">
                  <div class="card-body">
                    <h5 class="card-title">
                      <span>{{ req.dataType }}</span>
                      <span class="card-subtitle mb-2 text-muted">{{ req.requestDate | displayDate }}</span>
                    </h5>
                    <div>
                      <FiltersDisplay :filters="req.specifications" :requestDate="req.requestDate"/>
                    </div>
                  </div>
                </div>
                <div v-if="isView" class="col-lg-2 col-sm-3 col-4 download-section">
                  <FileRequestDownload :request="req" ref="downloadCallback" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/file-request";
import FiltersDisplay from "@/components/file-requests/FiltersDisplay";
import FileRequestDownload from "@/components/file-requests/FileRequestDownload";

export default {
  name: "FileRequestHistory",
  components: { FiltersDisplay, FileRequestDownload },
  data () {
    return {
      displayError: ""
    };
  },
  computed: {
    isView () {
      return this.$route.name === "FileRequestHistory";
    },
    historyRequests () {
      // Convert parameters to object
      return this.$store.getters["FileRequest/getHistory"].map((request) => {
        request.specifications = JSON.parse(request.parameters);
        return request;
      });
    },
    user () {
      return this.$store.getters["User/getUser"];
    }
  },
  created () {
    this.$store.dispatch("FileRequest/GET_HISTORY", this.user).catch(err => {
      this.displayError = err.msg;
    });
  },
  methods: {
    onDownloadClick (request) {
      // Get CSV and link for download
      ApiService.downloadFileRequest(request).then(response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `request_${request.requestDate}.csv"`;
        link.click();
        URL.revokeObjectURL(link.href);
      }).catch(err => {
        this.displayError = err.response.data.msg;
      });
    },
    downloadCallback (err) {
      this.displayError = err;
    }
  },
  watch: {
    historyRequests (newVal) { }
  },
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
#file-request-history {
  margin-top: 10px;
  margin-botton: 10px;

  h4 {
    font-weight: bold;
  }

  .card {
    margin-top: 10px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);

    .card-title {
      text-align: left;

      span:nth-child(1) {
        margin-left: 10px;
      }
      span:nth-child(2) {
        float: right;
      }
    }
    .request-specifications {
      div {
        span:nth-child(1) {
          font-weight: bold;
          margin-right: 5px;
        }
      }
    }
    .download-section {
      background-color: #007bff;
      border-radius: 0 0.25 0.25 0;
      color: white;
      font-size: 24px;
    }
  }
}
</style>
