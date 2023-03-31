import merge from 'lodash/merge';
const env = process.env.NODE_ENV || 'development';
const baseConfig = {
  env,
  isDev: env === "development" || env === "dev",
  isTest: env === "testing" || env === "test",
  isProd: env === "production" || env === "prod",
  port: process.env.PORT || 3001,
  jwt: {
    refreshExp: process.env.JWT_REFRESH_EXPIRES_IN,
    accessExp: process.env.JWT_ACCESS_EXPIRES_IN,
  },
};

let envConfig = {};

switch (env) { 
    case 'dev':
    case 'development':
        envConfig = require('./dev').default;
        break;
    case 'test':
    case 'testing':
        envConfig = require('./testing').default;
        break;
    case 'prod':
    case 'production':
        envConfig = require('./prod').default;
        break;
    default:
        envConfig = require('./dev').default;
}

export default merge(baseConfig, envConfig);
