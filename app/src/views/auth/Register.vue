<template>
  <div id="register-view">
    <div v-if="!isVerifyEmail" class="container">
      <div class="row">
        <h2>Register</h2>
      </div>
      <div v-if="submissionResponse" class="row">
        <span class="col-md-12">{{ submissionResponse }}</span>
      </div>
      <div class="row form-group">
        <label for="register-email" class="col-form-label">Email:</label>
        <input type="text" id="register-email" class="form-control" v-model="email" />
      </div>
      <div class="row form-group">
        <label for="register-name" class="col-form-label">Name:</label>
        <input type="name" id="register-name" class="form-control" v-model="name" />
      </div>
      <div class="row form-group">
        <label for="register-pass" class="col-form-label">Password:</label>
        <input type="password" id="register-pass" class="form-control" v-model="password" />
      </div>
      <div class="row form-group">
        <label for="register-pass-confirmation" class="col-form-label">Confirm Password:</label>
        <input type="password" id="register-pass-confirmation" class="form-control" v-model="passConfirmation" />
      </div>
      <div class="row">
        <button class="btn btn-primary" v-on:click="submit">Submit</button>
      </div>
    </div>
    <div v-if="isVerifyEmail" class="container">
      <div v-if="submissionResponse" class="row">
        <span class="col-md-12">{{ submissionResponse }}</span>
      </div>
      <div class="row">
        <h3 class="col-lg-12">Check email to verify email address.</h3>
        <div class="col-lg 2 offset-lg-5">
          <button class="btn btn-primary btn-lg" v-on:click="resendVerification()">Resend</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthService from "@/http/auth";

export default {
  name: "Register",
  props: [],
  components: {},
  data () {
    return {
      uid: "",
      email: "",
      name: "",
      password: "",
      passConfirmation: "",
      submissionResponse: "",
      isVerifyEmail: false
    };
  },
  methods: {
    async send () {
      try {
        const response = await AuthService.register({
          email: this.email,
          name: this.name,
          password: this.password,
          password_confirmation: this.passConfirmation
        });
        // Save UID
        this.uid = response.uid;
        // Change to email verification notice
        this.isVerifyEmail = true;
      } catch (err) {
        this.submissionResponse = err.response.data.msg;
      }
    },
    submit () {
      if (this.password === this.passConfirmation) {
        this.send();
      } else {
        this.submissionResponse = "Password do not match.";
        this.password = "";
        this.passConfirmation = "";
      }
    },
    resendVerification () {
      AuthService.resendVerificationEmail(this.uid, this.email).catch(err => {
        this.submissionResponse = err.response.data.msg;
      });
    }
  }
};
</script>

<style lang="scss">

</style>
