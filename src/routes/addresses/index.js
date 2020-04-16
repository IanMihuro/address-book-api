const express = require('express');
const { ALLOWED_ADDRESS_FIELDS } = require('../../lib/constants');
const { NotFoundError } = require('../../lib/errors');

const router = new express.Router();
const BASE_ROUTE = '/addresses';

//Create an Address
router.post(`${BASE_ROUTE}/`, async (req, res) => {
  try {
    const { Address } = req.models;
    const { name } = req.body;

    const addresses = await Address.find({ name });
    if (addresses && addresses.length) {
      res.status(400).send(`Address with name: ${name} already exists`);
    } else {
      const address = new Address(req.body);
      await address.save();
      res.status(201).send(address);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//Read all addresses
router.get(`${BASE_ROUTE}/`, async (req, res) => {
  try {
    const { Address } = req.models;
    const addresses = await Address.find({});
    const sanitizedAddresses  = addresses.map(a => a.sanitize());
    res.status(200).send(sanitizedAddresses);
  } catch (e) {
    res.status(500).send();
  }
});

//Read address by :id
router.get(`${BASE_ROUTE}/:id`, async (req, res) => {
  const _id = req.params.id;
  const { Address } = req.models;

  try {
    const address = await Address.findById(_id);
    if (!address) {
      return res.status(404).send(`Could not find an address with ID: ${_id}`);
    }
    const filteredAddress = address.sanitize();
    res.send(filteredAddress);
  } catch (e) {
    res.status(500).send();
  }
});

//Update Address
router.patch(`${BASE_ROUTE}/:id`, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every(update =>
    ALLOWED_ADDRESS_FIELDS.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const { Address } = req.models;
    const address = await Address.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!address) {
      return res
        .status(404)
        .send(new NotFoundError(`address with ID: ${_id} not found`));
    }
    const filteredAddress = address.sanitize();
    res.send(filteredAddress);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete address
router.delete(`${BASE_ROUTE}/:id`, async (req, res) => {
  try {
    const { Address } = req.models;
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).send();
    }
    const filteredAddress = address.sanitize();
    res.send(filteredAddress);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
