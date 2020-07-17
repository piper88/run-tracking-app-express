const express = require('express');
const debug = require('debug')('run:server');

const runRouter = require('./route/run-router.js');
const errorHandling = require('./lib/error-handling.js');

const PORT = 3000;
const app = express();

app.use(runRouter);
app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
