const express = require('express');
const debug = require('debug')('run:server');
const mongoose = require('mongoose');
const runRouter = require('./route/run-router.js');
const errorHandling = require('./lib/error-handling.js');

require('dotenv').config({path: `../.env`})
const PORT = process.env.PORT || 3000;
const app = express();

app.use(runRouter);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
  console.log(`mongodb uri ${process.env.MONGODB_URI}`)
});

//using atlas version of mongoDB
mongoose.connect(process.env.MONGODB_URI, {useFindAndModify: false, useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  console.log('Database connection successful');
}).catch(() => {
  console.error('Database connection unsuccessful');
});

mongoose.connection.on('error', err => {
  console.error(err);
});

//to use local version of mongoDB, change uri connection path to: mongodb://localhost:27017/<dbname>
// mongoose.connect('mongodb://localhost:27017/run', {useFindAndModify: false, useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
//   console.log('Database connection successful');
// }).catch(() => {
//   console.error('Database connection unsuccessful');
// });
//
// mongoose.connection.on('error', err => {
//   console.error(err);
// });
