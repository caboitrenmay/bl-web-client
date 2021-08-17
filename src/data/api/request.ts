/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { baseUrl } from '../../config';

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000, // request timeout
});

export const get = <T>(url: string, queryParams?: any): Promise<T> => {
  return new Promise(resolve => {
    service
      .get<T>(url, { params: queryParams })
      .then(result => resolve(result.data));
  });
};

export const post = <T>(
  url: string,
  body: any,
  queryParams?: any,
): Promise<T> => {
  return new Promise(resolve => {
    service
      .post<T>(url, body, { params: queryParams })
      .then(result => resolve(result.data));
  });
};
