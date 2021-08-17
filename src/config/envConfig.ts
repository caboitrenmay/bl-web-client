/* eslint-disable no-undef */
const envConfig = {
  baseApiUrl: process.env.REACT_APP_BASE_API_URL || 'http://localhost:3000/v1',
  base: process.env.REACT_APP_BASE || 'development',
  port: process.env.PORT || 5000,
};

console.log('===>  env: ', envConfig);

// api url
const baseUrl = envConfig.baseApiUrl;

function isLoggerMode() {
  const base = envConfig.base;
  return !(base && base === 'production');
}
const IS_LOGGER = isLoggerMode();

export { envConfig, baseUrl, IS_LOGGER };
