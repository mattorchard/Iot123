const { Pool } = require('pg');
const Measurement = require('../models/measurement');
const Capture = require('../models/capture');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});


async function saveCapture(capture) {
  if (!capture.isValid()) {
    throw new Error("Invalid capture");
  }
  const {timeStamp, owner, isPublic} = capture;
  const timeWithTimeZone = timeStamp.text;
  capture.measurements.forEach(async measurement => {
    const {type, value} = measurement;
    const values = [type, value, timeWithTimeZone, owner, isPublic];
    return await pool.query(
      'INSERT INTO public.measurements' +
      '(type, value, timestamp, owner_id, public)' +
      'VALUES ($1, $2, $3, $4, $5);', values);
  });
}

async function getMeasurements(owner) {
  const data = await pool.query('SELECT * FROM public.measurements WHERE owner_id = $1;', [owner]);
  return data.rows
    ? data.rows.map(row => new Measurement(row))
    : [];
}

module.exports = {
    saveCapture, getMeasurements
};