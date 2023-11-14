const express = require('express');
const app = express();
const port = 5001;

app.get('/api', (req, res) => {
  res.send('Hello World!HeHe');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});