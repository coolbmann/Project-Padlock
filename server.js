const express = require('express');
const app = express();

const words = require('simple-words');

app.use('/', express.static('public'));

app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`)
});