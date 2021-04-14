<template>
  <div id="email-verification-view" class="container">
    <div class="row">
      <div class="col-lg-12">
        <h6>Verifying email...</h6>
      </div>
      <div class="col-lg-12">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from "@/http/auth";

export default {
  name: "EmailVerificationView",
  props: [],
  components: {},
  data () {
    return {
      msg: ""
    };
  },
  created () {
    AuthService.verifyEmail(this.$route.params.uid, this.$route.params.hash).then(response => {
      // Navicate to login
      this.$router.push({ name: "Login", query: { msg: "Email Verified" } });
    }).catch(err => {
      this.msg = err.response.data.msg;
    });
  },
  methods: {}
};
</script>

<style lang="scss">
#email-verification-view {
  margin-top:10px;
}
</style>
