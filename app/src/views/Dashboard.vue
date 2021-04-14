<template>
  <div id="dashboard" class="container-fluid">
    <h2>DASHBOARD</h2>
    <p>{{ msg }}</p>
    <ul class="nav nav-tabs" id="dashboard-tabs" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="subscription-tab" data-toggle="tab" href="#subscriptions" role="tab" aria-controls="subscriptions" aria-selected="true">
          Subscriptions
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
      </li>
    </ul>
    <div class="tab-content" id="dashboard-tab-content">
      <div class="tab-pane fade show active" id="subscriptions" role="tabpanel" aria-labelledby="subscriptions-tab">
        <Subscriptions v-bind:userId="user.uid" />
      </div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        Profile Tab
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Subscriptions from "@/components/dashboard/Subscriptions";
// import AuthService from "@/http/auth";

export default {
  name: "Dashboard",
  components: { Subscriptions },
  computed: {
    user () {
      return this.$store.getters["User/getUser"];
    }
  },
  data () {
    return {
      msg: "",
      userId: ""
    };
  },
  async created () {
    this.userId = this.$store.getters["User/getUser"][0];
    // this.msg = await AuthService.authorize();
  },
  methods: {}
};
</script>

<style lang="scss">

</style>
