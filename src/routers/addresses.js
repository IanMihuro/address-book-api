const express = require("express");
const Address = require("../models/address");
const router = new express.Router();

//Create an Address
router.post("/addresses", async (req, res) => {
  const address = new Address(req.body);

  try {
    await address.save();
    res.status(201).send(address);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Read all addresses
router.get("/addresses", async (req, res) => {
  try {
    const addresses = await Address.find({});
    res.send(addresses);
  } catch (e) {
    res.status(500).send();
  }
});

//Read address by :id
router.get("/addresses/:id", async (req, res) => {
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
router.patch("/addresses/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "phoneNumber", "email", "postalAddress"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
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
router.delete("/addresses/:id", async (req, res) => {
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
