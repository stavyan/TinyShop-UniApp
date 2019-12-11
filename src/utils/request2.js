import http from './http'
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .get(url,{
          params,
      })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, params)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, { ...paramsCommon, ...params })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    http
      .post(url, { ...paramsCommon, ...params })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
}
