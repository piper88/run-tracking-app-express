const createError = require('http-errors');


//factors that affect Rate of Perceived Exertion (RPE)
  //done alone or with others
  //music or no music
  //temperature outside
  //mentally fatiguing activity prior to running
  //amount of sleep
  //amount of water that day
  //
module.exports = exports = function (date, distance, pace) {
  if (!date) return Promise.reject(createError(400, 'expected date'));
  if (!distance) return Promise.reject(createError(400, 'expected distance'));
  if (!pace) return Promise.reject(createError(400, 'expected pace'));
  this.date = date;
  this.distance = distance;
  this.pace = pace;
  return this;
  //same as above?
  //is returning a resolved promise the same as just returning a value?
  // return Promise.resolve(this);
}
