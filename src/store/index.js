import Vue from "vue"
import Vuex from "vuex"
import example from "./modules/example"
import auth from "./modules/auth"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        example,
        auth
    },
    strict: false
  });