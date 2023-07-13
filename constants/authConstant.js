/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  DEVICE_SECRET:'myjwtdevicesecret',
  EXPIRES_IN: 10000
};

const USER_TYPES = {
  User:1,
  Admin:2,
};

const PLATFORM = { DEVICE:1, };

let LOGIN_ACCESS = {
  [USER_TYPES.User]:[PLATFORM.DEVICE],        
  [USER_TYPES.Admin]:[PLATFORM.DEVICE],        
};

const MAX_LOGIN_RETRY_LIMIT = 5;
const LOGIN_REACTIVE_TIME = 10;   

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  }
};

module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
};