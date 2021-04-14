<template>
  <b-modal id="newSubscriptionModal" ref="newSubModal" title="Create New Subscription" hide-footer>
    <form>
      <div v-if="submissionResponse" class="alert alert-danger" role="alert">{{ submissionResponse }}</div>
      <div class="form-group">
        <label for="county-form-select">County:</label>
        <select class="form-control" id="county-form-select" v-model="county">
          <option>HILLSBOROUGH</option>
          <option>PINELLAS</option>
        </select>
      </div>
       <div class="form-group">
        <label for="type-form-select">Type:</label>
        <select class="form-control" id="type-form-select" v-model="type">
          <option>DIVORCE</option>
          <option>EVICTION</option>
          <option>FORECLOSURE</option>
        </select>
      </div>
    </form>
    <b-button class="mt-3" variant="primary" block @click="submit">Submit</b-button>
    <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
  </b-modal>
</template>

<script>
export default {
  name: "NewSubscriptionModal",
  props: ["uid"],
  components: {},
  data () {
    return {
      submissionResponse: "",
      county: "",
      type: ""
    };
  },
  methods: {
    show () {
      this.$refs.newSubModal.show();
    },
    submit () {
      this.$store.dispatch("Subscription/CREATE", { uid: this.uid, county: this.county, type: this.type }).then(response => {
        this.submissionResponse = response;
        this.hideModal();
      }).catch(err => {
        this.submissionResponse = err.response.data.msg;
      });
    },
    hideModal () {
      this.$refs.newSubModal.hide();
    }
  }
};
</script>

<style lang="scss">
</style>
