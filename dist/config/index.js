"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var merge_1 = __importDefault(require("lodash/merge"));
var env = process.env.NODE_ENV || 'development';
var baseConfig = {
    env: env,
    isDev: env === 'development' || env === 'dev',
    isTest: env === 'testing' || env === 'test',
    isProd: env === 'production' || env === 'prod',
    port: process.env.PORT || 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        // jwtExp: '100d',
        dbUrl: process.env.DB_URL
    }
};
var envConfig = {};
switch (env) {
    case 'dev':
    case 'development':
        envConfig = require('./dev')["default"];
        break;
    case 'test':
    case 'testing':
        envConfig = require('./testing')["default"];
        break;
    case 'prod':
    case 'production':
        envConfig = require('./prod')["default"];
        break;
    default:
        envConfig = require('./dev')["default"];
}
exports["default"] = (0, merge_1["default"])(baseConfig, envConfig);
//# sourceMappingURL=index.js.map