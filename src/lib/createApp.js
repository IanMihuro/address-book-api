const express = require('express');
const db = require('./db');
const { NotFoundError, MongooseValidationError } = require('./errors');
const { errors } = require('celebrate');
const models = require('../models');
const { publicRoutes, apiRoutes } = require('../routes');

async function createApp() {
  try {
    const app = express();

    app.use(express.json());
    // ROUTES MIDDLEWARE

    // error handling middleware
    app.use( async function(req, res, next) {
      try {
        await next();
      } catch (error) {
        if (error instanceof NotFoundError) {
          res.status(404).send(error.message);
        }

        if (error instanceof MongooseValidationError) {
          res.status(400).send(error.message);
        }

        // this is a server error
        if (error.status === 500) {
          res.status(error.status).send();
        } else {
          // may not necessarily be a server error & is not a 404 or a 400
          const defaultMessage = 'An error occurred with the app';
          const message = error.body || error.message || defaultMessage;
          res.status(error.status).send(message);
        }

      }
    });

    // register models for use acorss the app
    app.use(async function(req, res, next) {
      req.models = models;

      await next();
    });

    // register routes
    // api routes
    apiRoutes.forEach(r => app.use('/api/v1', r));

    // heartbeat & home route
    publicRoutes.forEach(r => app.use('/', r));

    // handle Celebrate errors
    app.use(errors());

    // connect to DB
    await db.connect();

    return app;

  } catch (error) {
    console.log('There was an error creating an Express app');
    console.log(error);
    process.exit(1);
  }
}


module.exports = createApp;
