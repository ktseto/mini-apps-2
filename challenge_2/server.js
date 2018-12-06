const express = require('express');

const PORT = 3000;
const app = express();

app.use('/', express.static(`${__dirname}/public`));

app.get('/', (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
