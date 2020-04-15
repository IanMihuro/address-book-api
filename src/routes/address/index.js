const express = require("express");
const Address = require("../../models/address");
const router = new express.Router();
const version = process.env["API_VERSION"];
const { ALLOWED_ADDRESS_FIELDS } = require("../../lib/constants");

//Create an Address
router.post(`${version}/addresses`, async (req, res) => {
  const address = new Address(req.body);

  try {
    await address.save();
    res.status(201).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Read all addresses
router.get(`${version}/addresses`, async (req, res) => {
  try {
    const addresses = await Address.find({});
    res.send(addresses);
  } catch (e) {
    res.status(500).send();
  }
});

//Read address by :id
router.get(`${version}/addresses/:id`, async (req, res) => {
  const _id = req.params.id;

  try {
    const address = await Address.findById(_id);
    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    res.status(500).send();
  }
});

//Update Address
router.patch(`${version}/addresses/:id`, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every((update) =>
    ALLOWED_ADDRESS_FIELDS.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const address = await Address.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Delete address
router.delete(`${version}/addresses/:id`, async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).send();
    }
    res.send(address);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
