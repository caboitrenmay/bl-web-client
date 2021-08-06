import {baseUrl} from '../../config';

const fullUrl = (path: string) => baseUrl + path;

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  const body = await response.json();
  return body;
}

export async function get<T>(
  path: string,
  args: RequestInit = {method: 'get'},
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = {method: 'post', body: JSON.stringify(body)},
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {method: 'put', body: JSON.stringify(body)},
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}
