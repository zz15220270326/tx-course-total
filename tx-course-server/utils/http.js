const nodeFetch = require('node-fetch');

function getTotalUrl(url, params) {
  if (!params || !Object.keys(params).length) {
    return url;
  }

  let reqUrl = url;

  reqUrl += '?';
  for (let k in params) {
    reqUrl += k + '=' + params[k] + '&';
  }

  return reqUrl.replace(/\&$/, '');
}

class HTTP {
  httpGet({
    url,
    params,
    headers
  }) {
    const httpUrl = getTotalUrl(url, params);

    return new Promise((resolve, reject) => {
      nodeFetch(httpUrl, {
        headers
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  httpPost({
    url,
    data,
    headers
  }) {
    return new Promise((resolve, reject) => {
      nodeFetch(url, {
        method: 'POST',
        data,
        headers
      })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}

module.exports = new HTTP({});
