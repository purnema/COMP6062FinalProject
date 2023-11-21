const express = require('express');
const app = express();
const port = 5001;

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World!HeHe');
});

app.put('/api/volume', (req, res) => {
  DataTransfer.volume = (req.body.volume);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});