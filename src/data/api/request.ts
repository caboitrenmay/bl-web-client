/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { baseUrl } from '../../config';

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

export const get = <T>(url: string, queryParams?: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .get<T>(url, { params: queryParams })
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
};

export const post = <T>(
  url: string,
  body: any,
  queryParams?: any,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .post<T>(url, body, { params: queryParams })
      .then(result => resolve(result.data))
      .catch(err => reject(err));
  });
};
