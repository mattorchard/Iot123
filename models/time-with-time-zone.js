class TimeWithTimeZone {
  constructor(text) {
    this.text = text;
    try {
      this.time = Date.parse(time);
    } catch (e) {
      this.time = null;
    }
  }

  isValid() {
    return this.time && this.text;
  }

}
module.exports = TimeWithTimeZone;