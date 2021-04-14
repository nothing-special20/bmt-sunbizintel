<template>
  <div id="file-request-history-page">
    <div class="container">
      <History />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import History from "@/components/file-requests/History";

export default {
  name: "FileRequestHistory",
  components: { History },
  data () {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
#file-request-history-page {
  margin-top: 10px;
}
</style>
