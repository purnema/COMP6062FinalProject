const express = require('express');
const fsp = require('fs').promises;
const app = express();
const port = 5001;

app.use(express.json());

app.get('/api/volume', (req, res, next) => {
  fsp.readFile('data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send({ volume: json.volume });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.put('/api/volume', (req, res) => {
  fsp.readFile('data.json')
    .then((data) => {
      const json = JSON.parse(data);
      json.volume = Number(req.body.volume);
      console.log(req.body);
      fsp.writeFile('data.json', JSON.stringify(json))
        .then(() => {
          res.send({ volume: json.volume });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Data file not found or corrupt');
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Data file not found or corrupt');
      });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});