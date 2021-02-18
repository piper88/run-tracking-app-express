const express = require('express');
const debug = require('debug')('run:server');
const mongoose = require('mongoose');

const runRouter = require('./route/run-router.js');
const errorHandling = require('./lib/error-handling.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(runRouter);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});

//using atlas version of mongoDB
mongoose.connect('mongodb+srv://sdebey88:8x18pi$74SNB@cluster0.wjb0y.mongodb.net/workouts?retryWrites=true&w=majority', {useFindAndModify: false, useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  console.log('Database connection successful');
}).catch(() => {
  console.error('Database connection unsuccessful');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

//to use locally downloaded version of mongoDB, change uri connection path to: mongodb://localhost:27017/<dbname>
// mongoose.connect('mongodb://localhost:27017/run', {useFindAndModify: false, useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
//   console.log('Database connection successful');
// }).catch(() => {
//   console.error('Database connection unsuccessful');
// });
//
// mongoose.connection.on('error', err => {
//   console.error(err);
// });
