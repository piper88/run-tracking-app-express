const createError = require('http-errors');
const debug = require('debug');
let mongoose = require('mongoose');
// let validator = require('validator');

var runSchema = new mongoose.Schema({
  //user should input date as YYYY/MM/DD
  //manipulate it to be Month Date, Year //e.g. June 1, 2020
  date: {type: String, required: [true, 'Date required']},
  distance: {type: Number, required: [true, 'Distance required']},
  pace: {type: Number, required: [true, 'Pace required']}
})

//mongoose validates before saving, thus pre hook isn't running with post example with missing body, because it's failing on validation, doesn't even get to saving.
// runSchema.pre('save', function() {
//   console.log('pre save hook');
//   next();
// })

//mongoose recognizes this as error handler, because of 3 paramaters including error. Anytime an erorr is triggered in pre hook, or save, this runs.
// runSchema.post('save', function(error, doc, next) {
//   //this next passes error back to rejected promise in runRouter
//   next(error);
// })

//be sure to define any pre/post hooks before compiling the model (the line below). Otherwise the hooks won't be added.
module.exports = mongoose.model('Run', runSchema);
