<template>
  <div id="forgot-password-component">
    <h5>Forgot Password</h5>
    <p v-if="msg">{{ msg }}</p>
    <div v-if="!success" class="row form-group">
       <label for="forgot-pass-email" class="col-form-label">Email:</label>
       <input type="text" id="forgot-pass-email" class="form-control" v-model="email" />
    </div>
    <div v-if="!success" class="row">
      <button v-on:click="submit" class="btn btn-primary btn-block">Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from "@/http/auth";

export default {
  name: "ForgotPassword",
  props: {},
  data () {
    return {
      email: "",
      msg: "",
      success: false
    };
  },
  methods: {
    async submit () {
      AuthService.forgotPassword(this.email).then(() => {
        this.success = true;
        this.msg = "Please check email to reset password.";
      }).catch(err => {
        this.msg = err.response.data.msg;
      });
    }
  }
};
</script>

<style lang="scss">
</style>
