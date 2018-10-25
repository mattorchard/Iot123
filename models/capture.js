const TimeWithTimeZone = require('./time-with-time-zone');
const Measurement = require('./measurement');


class Capture {
  constructor({owner, timeStamp, isPublic, measurements}) {
    this.owner = owner;
    this.timeStamp = new TimeWithTimeZone(timeStamp);
    this.isPublic = Boolean(isPublic);
    this.measurements = measurements && measurements.map(item => new Measurement(Object.assign(item, this)));
  }

  isValid() {
    return this.owner
        && this.timeStamp
        && this.measurements
        && this.measurements.length > 0
        && this.measurements.every(measurement => measurement.isValid())
  }
}
module.exports = Capture;