const { ValidationError: MongooseValidationError } = require('mongoose/lib/error');

class MongoDBError extends Error {
  constructor(message) {
    super(message);
    this.name = 'mongodbError';
  }
}

class NotFoundError extends Error {
  constructor() {
    super();

    this.name = 'notFoundError';
  }
}

class JoiValidationError extends Error {
  constructor(message) {
    super(message);

    this.name = 'JoiValidationError';
  }
}


module.exports = {
  MongoDBError,
  NotFoundError,
  MongooseValidationError,
  JoiValidationError,
};
