<template>
  <div id="password-reset-view" class="container">
    <div class="row">
      <div class="col-md-5 offset-md-2 card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12">
              <h2>Enter New Password</h2>
            </div>
            <div class="col-lg-12">
              {{ msg }}
            </div>
            <div class="col-lg-12">
              <label for="password-input" class="col-form-label">Password:</label>
              <input id="password-input" type="password" class="form-control" v-model="password" />
              <label for="confirm-input" class="col-form-label">Confirm:</label>
              <input id="confirm-input" type="password" class="form-control" v-model="passwordConfirm" />
              <button class="btn btn-primary btn-block" v-on:click="onSubmitClick">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from "@/http/auth";

export default {
  name: "PasswordResetView",
  props: [],
  components: { },
  data () {
    return {
      msg: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    send () {
      AuthService.resetPassword(this.$route.params.uid, this.$route.params.hash, this.password, this.passwordConfirm).then(response => {
        // Navicate to login
        this.$router.push({ name: "Login", query: { msg: "Password+Reset" } });
      }).catch(err => {
        this.msg = err.response.data.msg;
      });
    },
    onSubmitClick () {
      if (this.password !== this.passwordConfirm) {
        this.msg = "Passwords do not match.";
        return;
      }
      this.send();
    }
  }
};
</script>

<style lang="scss">
#password-reset-view {
  margin-top:10px;
  button {
    margin-top: 10px;
  }
}
</style>
