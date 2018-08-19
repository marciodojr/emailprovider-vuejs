import axios from 'axios';
import qs from 'qs';

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
    delete(url) {
        return this.request('DELETE', url);
    },
    request(method, url, data = {}) {

        var headers = {
            'content-type': 'application/x-www-form-urlencoded'
        };

        if(this.token) {
            headers['x-token'] = this.token;
        }

        return axios(API_URL + url, {
          method: method,
          data: qs.stringify(data),
          headers
        });
    }
}