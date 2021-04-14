<template>
  <div id="subscriptions-container" class="container-fluid">
    <div id="subscription-toolbar" class="row">
      <button class="btn btn-primary" title="New" data-toggle="tooltip" v-on:click="onNewSubscriptionClick()">
        <span>New</span>
        <octicon name="plus" scale="1.5"></octicon>
      </button>
    </div>
    <table id="subscriptions-table" class="table">
      <thead>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">County</th>
        <th scope="col">Type</th>
        <th scope="col"></th>
      </thead>
      <tbody>
        <tr v-for="(sub, index) in subscriptions" :key="sub.sid" @click="onClickSubscription(index)">
          <td>
            <input type="checkbox"/>
          </td>
          <td>
            <span class="subscription-alert" v-if="sub.lastView < sub.lastUpdate">
              <octicon name="alert" scale="1"></octicon>
            </span>
          </td>
          <td>{{ sub.county }}</td>
          <td>{{ sub.type }}</td>
          <td>
            <a class="subscription-delete" title="Delete" data-toggle="tooltip" v-on:click.stop="onSubscriptionDelete(index)">
              <octicon name="trashcan" scale="1.5"></octicon>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <NewSubscriptionModal ref="newSubModalComponent" v-bind:uid="userId" />
    <DeleteSubscriptionModal ref="deleteSubModalComponent" v-bind:subscription="delsub" />
  </div>
</template>

<script>
// @ is an alias to /src";
import NewSubscriptionModal from "@/components/dashboard/NewSubscriptionModal";
import DeleteSubscriptionModal from "@/components/dashboard/DeleteSubscriptionModal";

export default {
  name: "Subscriptions",
  props: ["userId"],
  components: { NewSubscriptionModal, DeleteSubscriptionModal },
  computed: {
    subscriptions () {
      return this.$store.getters["Subscription/getSubscriptions"];
    }
  },
  data () {
    return {
      delsub: {}
    };
  },
  async created () {
    // Fetch subscriptions
    this.$store.dispatch("Subscription/RETRIEVE_SUBSCRIPTIONS", this.userId).catch(error => {
      console.log(error);
    });
  },
  methods: {
    onClickSubscription (index) {
      // Navigate to subscription view
      this.$router.push({ name: "subscription", query: { index: index } });
      // Fetch subscription data
      this.$store.dispatch("Subscription/UPDATE", index);
    },
    onNewSubscriptionClick () {
      this.$refs.newSubModalComponent.show();
    },
    onSubscriptionDelete (index) {
      // Update subscription for deletion
      this.delsub = this.subscriptions[index];
      // Show confirmation modal
      this.$refs.deleteSubModalComponent.show();
    }
  },
  watch: {
    subscriptions () {
      return this.$store.getters["Subscription/getSubscriptions"];
    }
  }
};
</script>

<style lang="scss">
#subscriptions-container {
  margin-top: 10px;

  #subscription-toolbar {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;

    button > span:nth-child(1) {
      margin-right: 5px;
    }
  }
}
#subscriptions-table {
  border-top: 2px solid black;

  thead {
    th:nth-child(1) {
      width: 5%;
    }
    th:nth-child(2) {
      width: 5%;
    }
  }
  tbody {
    tr:hover {
      cursor: pointer;
      background-color: rgb(250,250,250);
    }
    td:nth-child(1) {
      width: 5%;
    }
    td:nth-child(2) {
      width: 5%;
    }
  }
  .subscription-alert {
    color: red;
  }
  .subscription-delete:hover {
    color: lightgray;
    cursor: pointer;
  }
}
</style>
