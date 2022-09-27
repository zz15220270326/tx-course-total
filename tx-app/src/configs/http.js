/** 请求相关的配置 */
export const BASE_URL = '/api';

export const HTTP_OPTIONS = {
  baseURL: BASE_URL,
  timeout: 5 * 1000,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const APIS = {};
