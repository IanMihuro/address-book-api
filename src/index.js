require('dotenv').config();

const { createApp } = require('./lib');

const port = process.env.PORT || 3000;
console.log(`MONGODB URI: ${process.env.MONGO_URI}`);

async function main() {
  try {
    const app = await createApp();

    app.listen(port, () => {
      console.log(`Server running on: http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Problem occurred while starting Express app');
    console.log(error);
    process.exit(1);
  }
}

module.exports = main();

