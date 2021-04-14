<template>
  <b-modal id="deleteSubscriptionModal" ref="delSubModal" title="Do You Want to Remove Subscription?" hide-footer>
    <div v-if="submissionResponse" class="alert alert-danger" role="alert">{{ submissionResponse }}</div>
    <div class="row">
      <span class="col-sm-2">County:</span>
      <span class="col-sm-8">{{ subscription.county }}</span>
    </div>
    <div class="row">
      <span class="col-sm-2">Type:</span>
      <span class="col-sm-8">{{ subscription.type }}</span>
    </div>
    <b-button class="mt-3" variant="primary" block @click="submit">Confirm</b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
  </b-modal>
</template>

<script>
export default {
  name: "DeleteSubscriptionModal",
  props: ["subscription"],
  components: {},
  data () {
    return {
      submissionResponse: ""
    };
  },
  methods: {
    show () {
      this.$refs.delSubModal.show();
    },
    submit () {
      // Dispatch DELETION request
      this.$store.dispatch("Subscription/DELETE", {
        sid: this.subscription.sid,
        uid: this.subscription.uid
      }).then(response => {
        // Close modal on success
        this.hideModal();
      }).catch(err => {
        // Display error
        this.submissionResponse = err.response.data.msg;
      });
    },
    hideModal () {
      this.$refs.delSubModal.hide();
    }
  }
};
</script>

<style lang="scss">
#deleteSubscriptionModal {
  div:nth-child(2),
  div:nth-child(3) {
    span:nth-child(1) {
      font-weight: bold;
    }
  }
}
</style>
