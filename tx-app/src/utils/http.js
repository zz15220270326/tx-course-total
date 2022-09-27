import axios from 'axios';
import qs from 'qs';
import { HTTP_OPTIONS } from '@/configs/http';

const _instance = Symbol('_instance');
const _interceptors = Symbol('_interceptors');

class HTTP {
  constructor(options = {}) {
    this[_instance] = axios.create({
      ...HTTP_OPTIONS,
      ...options,
    });
  }
  [_interceptors]() {
    this[_instance].interceptors.request.use(configs => {
      return configs;
    }, (requestError) => {
      return Promise.reject(requestError);
    });
    this[_instance].interceptors.response.use(res => {
      return res;
    }, (responseError) => {
      return Promise.reject(responseError);
    });
  }
  /**
   * 请求方法
   * @param {import('axios').AxiosRequestConfig} options
   */
  request(options = {}) {
    const {
      data,
      ...subOptions
    } = options;

    return new Promise((resolve, reject) => {
      this[_interceptors]();
      this[_instance]({
        data: qs.stringify(data),
        ...subOptions
      })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

export default HTTP;
