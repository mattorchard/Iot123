const express = require('express');
const Capture = require('../models/capture');
const Measurement = require('../models/measurement');
const db = require('../db/db');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/capture', async(req, res) => {
  console.log("req.body", req.body);
  //Todo: Validate owner
  const capture = new Capture(req.body);
  db.saveCapture(capture);
  res.send(capture);
});

router.get('/measurements/:owner', async(req, res) => {
  //Todo: Validate owner
  const owner = req.params.owner;
  if (!owner) {
    throw new Error("No owner specified");
  }
  const measurements = await db.getMeasurements(owner);
  res.send(measurements);
});

module.exports = router;
