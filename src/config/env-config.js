/* eslint-disable no-undef */
const envConfig = {
  baseApiUrl: process.env.REACT_APP_BASE_API_URL,
  base: process.env.REACT_APP_BASE,
  port: process.env.PORT,
};

console.log('===>  env: ', envConfig);

export {envConfig};

// api url
export const baseUrl = envConfig.baseApiUrl;
export const ERROR_CONNECTION = (url, err) => {
  return {
    success: false,
    message: `Lỗi kết nối với server`,
    url: url,
    error: err,
  };
};

// logger
const logger = (message, data) => {
  if (!isLoggerMode()) {
    return;
  }
  return console.log(message, data);
};
function isLoggerMode() {
  const base = envConfig.base;
  return !(base && base === 'production');
}
export const IS_LOGGER = isLoggerMode();
export {logger};
