import Vue from "vue";
import App from "./App.vue";
import Axios from "axios";
import BootstrapVue from "bootstrap-vue";
import Octicon from "vue-octicon/components/Octicon.vue";
import router from "./router";
import store from "./store";
import Embed from "v-video-embed";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faCartPlus, faFileDownload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "vue-octicon/icons/alert";
import "vue-octicon/icons/arrow-left";
import "vue-octicon/icons/credit-card";
import "vue-octicon/icons/plus";
import "vue-octicon/icons/question";
import "vue-octicon/icons/trashcan";
import "vue-octicon/icons/x";

library.add(faShoppingCart);
library.add(faCartPlus);
library.add(faFileDownload);
library.add(faCheckCircle);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Embed);

Vue.component("octicon", Octicon);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// set auth header
if (store.state.token) {
  Axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`;
}

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");
