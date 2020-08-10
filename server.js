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


mongoose.connect('mongodb://localhost:27017/run', {useNewUrlParser: true}).then(() => {
  console.log('Database connection successful');
}).catch(() => {
  console.error('Database connection unsuccessful');
});

mongoose.connection.on('error', err => {
  console.error(err);
});
