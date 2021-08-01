import {baseUrl, ERROR_CONNECTION} from '../../config';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && {Authorization: `Bearer ${token}`}),
  };
};

const getFormDataHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    // "Content-Type": "application/x-www-form-urlencoded",
    ...(token && {Authorization: `Bearer ${token}`}),
  };
};

export const get = (url, query) => {
  return new Promise((resolve, reject) => {
    let urlFull = `${baseUrl}${url}`;
    if (query) {
      urlFull = new URL(urlFull);
      urlFull.search = new URLSearchParams(query);
    }
    fetch(urlFull, {
      method: 'GET',
      headers: getHeaders(),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(ERROR_CONNECTION(baseUrl + url, err)));
  });
};

export const post = (url, body = {}, query) => {
  return new Promise((resolve, reject) => {
    let urlFull = `${baseUrl}${url}`;
    if (query) {
      urlFull = new URL(urlFull);
      urlFull.search = new URLSearchParams(query);
    }
    fetch(urlFull, {
      body: JSON.stringify(body),
      method: 'POST',
      headers: getHeaders(),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(ERROR_CONNECTION(baseUrl + url, err)));
  });
};

export const put = (url, body = {}, query) => {
  return new Promise((resolve, reject) => {
    let urlFull = `${baseUrl}${url}`;
    if (query) {
      urlFull = new URL(urlFull);
      urlFull.search = new URLSearchParams(query);
    }
    fetch(urlFull, {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: getHeaders(),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(ERROR_CONNECTION(baseUrl + url, err)));
  });
};

export const putFormData = (url, formData) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, {
      body: formData,
      method: 'PUT',
      headers: getFormDataHeaders(),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(ERROR_CONNECTION(baseUrl + url, err)));
  });
};

export const del = (url, body = {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${url}`, {
      body: JSON.stringify(body),
      method: 'DELETE',
      headers: getHeaders(),
    })
      .then(response => resolve(response.json()))
      .catch(err => reject(ERROR_CONNECTION(baseUrl + url, err)));
  });
};
