class Measurement {
  constructor({type, value, timeStamp, owner, isPublic}) {
    this.type = type;
    this.value = Number(value);
    this.timeStamp = timeStamp;
    this.owner = owner;
    this.isPublic = isPublic;
  }

  isValid() {
    return this.type
      && (this.value || this.value === 0)
      && this.timeStamp
      && this.owner
      && this.isPublic;
  }
}
module.exports = Measurement;