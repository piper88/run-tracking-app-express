
module.exports = exports = function (date, distance, pace) {
  if (!date) throw new Error('expected date');
  if (!distance) throw new Error('expected distance');
  if (!pace) throw new Error('expected pace');
  this.date = date;
  this.distance = distance;
  this.pace = pace;
}
