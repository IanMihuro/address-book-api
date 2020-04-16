const express = require('express');
const router = new express.Router();


//GET '/'
router.get('/', async (req, res) => {
  try {
    const response = 'Welcome to Address API';
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
