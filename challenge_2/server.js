const express = require('express');
const path = require('path');
const axios = require('axios');

const PORT = 3000;
const app = express();

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/bpi', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2013-09-05')
    .then((response) => {
      res.send(response.data);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
