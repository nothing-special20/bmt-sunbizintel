<template>
  <div id="login-component">
    <h5>Login</h5>
    <p v-if="msg">{{ msg }}</p>
    <div class="row form-group">
       <label for="login-email" class="col-form-label">Email:</label>
       <input type="text" id="login-email" class="form-control" v-model="email" />
    </div>
    <div class="row form-group">
       <label for="login-pass" class="col-form-label">Password:</label>
       <input type="password" id="login-pass" class="form-control" v-model="password" />
    </div>
    <div class="row">
      <button v-on:click="submit" class="btn btn-primary btn-block">Submit</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import AuthService from "@/http/auth";

export default {
  name: "Login",
  props: {},
  data () {
    return {
      email: "",
      password: "",
      msg: ""
    };
  },
  methods: {
    async login () {
      const credentials = { email: this.email, password: this.password };
      this.$store.dispatch("User/LOGIN", credentials).then((response) => {
        this.msg = response.msg;
        this.$router.push("/file/requests");
      }).catch((error) => {
        this.msg = error.response.data.msg;
      });
    },
    submit () {
      this.login();
    }
  },
  watch: {}
};
</script>

<style lang="scss">
</style>
