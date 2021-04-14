<template>
  <button class="file-request-download" v-on:click="onDownloadClick()" :disabled="locked">
    <font-awesome-icon icon="file-download" style="height:100%" />
  </button>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/file-request";

export default {
  name: "FileRequestDownload",
  props: ["request"],
  data () {
    return {
      locked: false
    };
  },
  computed: {},
  methods: {
    onDownloadClick () {
      // If already locked
      if (this.locked) {
        return;
      }
      // Lock Button
      this.locked = true;

      // Get CSV and link for download
      ApiService.downloadFileRequest(this.request).then(response => {
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "ppploan.csv";
        link.click();
        this.locked = false;
        URL.revokeObjectURL(link.href);
      }).catch(err => {
        this.locked = false;
        this.$refs.displayError(err.response.data.msg);
      });
    }
  }
};
</script>

<style lang="scss">
.file-request-download {
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: inherit;

  border: none;
  background-color: inherit;

  &:hover {
    color: darkorange;
  }
  &:disabled {
    color: lightgray;
    cursor: wait;
  }
  &:focus-visible {
    outline: none;
  }
}
</style>
