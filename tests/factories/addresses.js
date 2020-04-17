const faker = require('faker');
const { factory } = require('factory-girl');
const { Address } = require('../../src/models');

/**
 * Generate MongoDB record
 * - Use this method when you want to test DB creation
 * (no need to use Mongoose since the data will be saved directly into DB)
 */

async function generateFactory() {
  try {
    // define factory together with the dummy data
    factory.define('address', Address, {
      name: faker.name.jobArea(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      postalAddress: faker.address.city(),
    });

    const address = await factory.build('address');
    return address;
  } catch (error) {
    console.log('[TESTS - factories] There was an error while generating factories');
    console.log(error);
  }
}

/**
 * Seed Data to Create Manually
 * - Use this method together with Mongoose
 */

function seedDataToCreate() {
  return {
    name: faker.name.jobArea(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    postalAddress: faker.address.city(),
  }
}

module.exports = {
  generateFactory,
  seedDataToCreate,
};