<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">Sunshine Analytics</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/feedback">Referral Requests</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/daasresearch">Want Specific Data?</router-link>
          </li>
        </ul>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link navbar-link-2 waves-effect" v-on:click="onCheckoutClick()">
                <span class="badge badge-pill badge-light">{{ numCartItems }}</span>
                <font-awesome-icon icon="shopping-cart" />
              </a>
            </li>
          </ul>
        </div>
        <span v-if="name" class="navbar-text profile-nav">
          <span>Hello {{ name }}!</span>
          <span class="dropdown show">
            <a class="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <a class="dropdown-item" href="#" v-on:click="onFileRequestClick">Request Data</a>
              <a class="dropdown-item" href="#" v-on:click="logout">Logout</a>
            </div>
          </span>
        </span>
        <span v-else class="navbar-text">
          <router-link to="/login">Login</router-link>
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from "@/http/api";

export default {
  name: "App",
  components: {},
  computed: {
    user () {
      return this.$store.getters["User/getUser"];
    },
    isLoggedIn () {
      return this.$store.getters["User/isLoggedIn"];
    },
    numCartItems () {
      return this.$store.getters["Checkout/getItemCount"];
    }
  },
  data () {
    return {
      name: ""
    };
  },
  created () {
    // Check for expired tokens
    ApiService.getInstance().interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config._isRetryRequest) {
          // Logout on unauthoriz
          this.$store.dispatch("User/LOGOUT");

          // Reset store
          this.$store.dispatch("RESET");
        }
        throw err;
      });
    });

    if (this.$store.getters["User/isLoggedIn"]) {
      // Set Auth Header
      ApiService.getInstance().defaults.headers.common.Authorization = `Bearer ${this.$store.getters["User/getToken"]}`;
      this.name = this.$store.getters["User/getUsername"];
    }
  },
  methods: {
    onCheckoutClick () {
      this.$router.push("/checkout");
    },
    onFileRequestClick () {
      this.$router.push("/file/requests");
    },
    logout () {
      // Perform logout
      this.$store.dispatch("User/LOGOUT").then(() => {
        // Redirect to home
        this.$router.push("/");
      });
      // Reset store
      this.$store.dispatch("RESET");
    }
  },
  watch: {
    user () {
      this.name = this.user.name;
    }
  }
};
</script>

<style lang="scss">

#nav {
  padding: 30px;
  text-align: left;

  .nav-item {
    padding-left: .5rem;
    padding-right: .5rem;
  }

  a {
    font-weight: bold;
    color: white;

    &:hover {
      cursor: pointer;
      color: #b7b5b5;
    }

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .profile-nav {
    span:first-child {
      font: 20px;
      color: white;
      font-weight: bold;
    }
    .dropdown-menu {
      left: auto;
      right: 0;
    }
    .dropdown-item {
      color: #535353;
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
