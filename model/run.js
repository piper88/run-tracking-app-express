const createError = require('http-errors');


module.exports = exports = function (date, distance, pace) {
  // if (!date) throw new Error('expected date');
  if (!date) return Promise.reject(createError(400, 'expected date'));
  // if (!distance) throw new Error('expected distance');
  if (!distance) return Promise.reject(createError(400, 'expected distance'));
  // if (!pace) throw new Error('expected pace');
  if (!pace) return Promise.reject(createError(400, 'expected pace'));
  this.date = date;
  this.distance = distance;
  this.pace = pace;
}
