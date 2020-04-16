const addressRoutes = require('./addresses');
const userRoutes = require('./users');
const heartbeatRoute = require('./heartbeat');
const homeRoute = require('./home');

module.exports = {
  publicRoutes: [
    heartbeatRoute,
    homeRoute,
  ],
  apiRoutes: [
    addressRoutes,
    userRoutes,
  ],
};

