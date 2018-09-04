import axios from 'axios';

const API_URL = process.env.VUE_APP_BASE_URI;

export default {
    token: '',
    get(url, data) {
        return this.request('GET', url, data);
    },
    post(url, data) {
        return this.request('POST', url, data);
    },
    put(url, data) {
        return this.request('PUT', url, data);
    },
    patch(url, data) {
        return this.request('PATCH', url, data);
    },
    delete(url, data) {
        return this.request('DELETE', url, data);
    },
    request(method, url, data = {}) {

        var headers = {};

        if(this.token) {
            headers['Authorization'] = 'Bearer ' + this.token;
        }

        return axios(API_URL + url, {
          method: method,
          data: data,
          headers
        });
    }
}