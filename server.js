const express = require ('express');
const app = express();

const runRouter = require('./route/run-router.js');
const PORT = 3000;

app.use(runRouter);

app.listen(PORT, () => {
  console.log(`server up on ${PORT}`);
});
