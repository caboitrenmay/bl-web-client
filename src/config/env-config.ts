/* eslint-disable no-undef */
const envConfig = {
  baseApiUrl: process.env.REACT_APP_BASE_API_URL,
  base: process.env.REACT_APP_BASE,
  port: process.env.PORT,
};

console.log('===>  env: ', envConfig);

// api url
const baseUrl = envConfig.baseApiUrl;

function isLoggerMode() {
  const base = envConfig.base;
  return !(base && base === 'production');
}
const IS_LOGGER = isLoggerMode();

export {envConfig, baseUrl, IS_LOGGER};
