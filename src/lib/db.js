const mongoose = require('mongoose');
const { MongoDBError } = require('./errors');

const { MONGO_URI } = process.env;
const CONNECTION_OPTIONS = Object.freeze({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

class DB {
  constructor(uri, options = {}) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      if(!this.isConnected()) {
        await mongoose.connect(this.uri, this.options);
        console.log(`[DB] DB NAME: ${this.name()}`);
        console.log('[DB] MongoDB connected successfully');
      }
    } catch (error) {
      console.log('[DB] An error occurred while connecting to MongoDB');
      throw new MongoDBError(error.message);
    }
  }

  async disconnect() {
    try {
      if (this.isConnected()) {
        await mongoose.connection.close();
        console.log('[DB] MongoDB disconnected successfully');
      }
    } catch (error) {
      console.log('[DB] There was an error disconnecting from MongoDB');
      throw new MongoDBError(error.message);
    }
  }

  async clean() {
    // drop databases after every test to speed up tests
    try {
      if(this.isConnected()) {
        console.log(`[DB] About to drop MongoDB name: ${this.name()}`)
        await mongoose.connection.dropDatabase();
        console.log('[DB] Database Clean up completed');
      }
    } catch (error) {
      console.log('[DB] There was an error dropping DB');
      console.log(error);
    }
  }

  name() {
    if (this.isConnected()) {
      return mongoose.connection.db.databaseName;
    }
  }

  collections() {
    if (this.isConnected()) {
      return mongoose.connection.db.listCollections();
    }
  }

  isConnected() {
    // mongoose.connection.readyState === 1 means there's a connection, 0 means it's not.
    return mongoose.connection.readyState === 1;
  }
}

module.exports = new DB(MONGO_URI, CONNECTION_OPTIONS);
