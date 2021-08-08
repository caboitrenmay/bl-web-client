import { baseUrl } from '../../config';

const fullUrl = (path: string) => baseUrl + path;

export async function http<T>(request: RequestInfo): Promise<T> {
  const response = await fetch(request);
  return await response.json();
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: 'get' },
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}

export async function post<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  body: never,
  args: RequestInit = { method: 'post', body: JSON.stringify(body) },
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}

export async function put<T>(
  path: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  body: never,
  args: RequestInit = { method: 'put', body: JSON.stringify(body) },
): Promise<T> {
  return await http<T>(new Request(fullUrl(path), args));
}
