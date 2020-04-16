const express = require('express');
const router = new express.Router();
const { name, version } = require('../../../package');

//GET '/heartbeat'
router.get('/heartbeat', async (req, res) => {
  try {
    const response = {
      name,
      version,
      enviroment: process.env.NODE_ENV,
    };
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
