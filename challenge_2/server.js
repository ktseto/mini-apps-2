const express = require('express');
const path = require('path');
const axios = require('axios');

const PORT = 3000;
const app = express();

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/bpi', (req, res) => {
  const { start, end } = req.query;
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
    .then((response) => {
      res.send(response.data);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
