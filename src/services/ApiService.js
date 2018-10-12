import Vue from "vue";
import axios from "axios";
import { store } from "./../store";

const API_URL = process.env.VUE_APP_BASE_URI;

const API = {
  install: function(Vue) {

    Vue.prototype.$api = {
      get(url, data) {
        return this.request("GET", url, data);
      },
      post(url, data) {
        return this.request("POST", url, data);
      },
      put(url, data) {
        return this.request("PUT", url, data);
      },
      patch(url, data) {
        return this.request("PATCH", url, data);
      },
      delete(url, data) {
        return this.request("DELETE", url, data);
      },
      request(method, url, data = {}) {
        var headers = {};
        var token = store.getters.authToken;
        if (token) {
          headers["Authorization"] = "Bearer " + token;
        }

        return axios(API_URL + url, {
          method: method,
          data: data,
          headers
        });
      }
    };
  }
};

Vue.use(API);
