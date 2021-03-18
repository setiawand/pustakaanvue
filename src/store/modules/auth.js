import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import axios from "axios";

const auth = {
  state: {
    token: localStorage.getItem("token") || "",
    status: "",
    hasLoadedOnce: false
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  actions: {
    [AUTH_REQUEST]: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        const qs = require('qs')
        commit(AUTH_REQUEST);
        axios
          .post('https://pustaka.sekolahan.id/api/login', qs.stringify({
            'username': user.username, 'password': user.password, 'tipe': 'admin'
          }))
          .then(resp => {
            console.log(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise(resolve => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("token");
        localStorage.removeItem("vuex");
        delete axios.defaults.headers.common['Authorization']
        resolve();
      });
    }
  },
  mutations: {
    [AUTH_REQUEST]: state => {
      state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, resp) => {
      state.status = "success";
      state.token = resp.data.responseData.results[0].token;
      state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
      state.status = "error";
      state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
      state.token = "";
    }
  }
}

export default auth;
