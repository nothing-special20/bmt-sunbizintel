<template>
  <div id="login-view" class="container">
    <div class="row">
      <div v-if="msg" id="msg-box" class="col-md-5 offset-md-2 card">
        <font-awesome-icon icon="check-circle" />
        {{ msg }}
      </div>
      <div class="col-md-5 offset-md-2 card">
        <div class="card-body">
          <Login v-if="login" />
          <ForgotPassword v-if="!login" />
          <div class="row">
            <div class="col-lg-12">
              <a v-if="login" v-on:click="toggleComponent()">Forgot Password</a>
              <a v-if="!login" v-on:click="toggleComponent()">Login</a>
            </div>
            <div id="sign-up-link" class="col-lg-12">
              <router-link to="/register">Sign Up</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 offset-md-2 card">
        <div class="card-body">
          <div class="row">
            Login or sign up to order data!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/auth/Login";
import ForgotPassword from "@/components/auth/ForgotPassword";

export default {
  name: "LoginView",
  props: [],
  components: { Login, ForgotPassword },
  data () {
    return {
      login: true,
      msg: ""
    };
  },
  created () {
    if (this.$route.query.msg) {
      this.msg = this.$route.query.msg;
    }
  },
  methods: {
    toggleComponent () {
      this.login = !this.login;
    }
  }
};
</script>

<style lang="scss">
#login-view {
  margin-top:10px;

  #msg-box {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;

    svg {
      color: green;
    }
  }

  a {
    color: #007bff;
    cursor: pointer;
  }
  #sign-up-link {
    margin-top: 20px;
  }
}
</style>
