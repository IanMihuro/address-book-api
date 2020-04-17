const request = require('supertest');
const { expect, createApp, db, testPort } = require('../setup');
const { seedDataToCreate } = require('../factories/addresses');

let server;
const BASE_URL = '/api/v1/addresses';

describe('Address', () => {
  beforeEach(async () => {
    const app = await createApp();
    server = app.listen(testPort);
  });

  afterEach(async () => {
    await server.close();
    await db.clean();
  });

  describe('create a new order', () => {
    it ('returns a 201', async () => {
      const address = seedDataToCreate();
      const correctPhoneNumber = address.phoneNumber.split(' ')[0]
      address.phoneNumber = correctPhoneNumber;

      const res = await request(server)
        .post(`${BASE_URL}/`)
        .set('Accept', 'application/json')
        .send(address);

      expect(res.status).to.eq(201);
      expect(res.body).to.containSubset({
        name: address.name,
        phoneNumber: address.phoneNumber,
      });
    });


    describe('Schema Validation', () => {
      describe('validates against phone number characters', () => {
        it('throws a validation error when a phone has more than 16 characters', async () => {
          const address = seedDataToCreate();
          address.phoneNumber = '180.989.7721.2382';

          const res = await request(server)
            .post(`${BASE_URL}/`)
            .set('Accept', 'application/json')
            .send(address);

          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('A phone number must be between 10 & 16 characters long');
        });

      });
    });
  });
});
