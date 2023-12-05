const express = require('express');
const { readFile } = require('fs').promises;
const fsp = require('fs').promises;
const app = express();
const port = 5001;

app.use(express.json());

app.get('/api/playlist', async (req, res) => {
  try {
    const data = await fsp.readFile('data.json', 'utf-8');
    const { playlist } = JSON.parse(data);

    // Check if there is a query parameter for the next song
    const { nextSongId } = req.query;

    // If a specific song ID is requested, find it; otherwise, return the entire playlist
    if (nextSongId) {
      const nextSong = playlist.find(song => song.id === parseInt(nextSongId));
      res.json({ nextSong });
    } else {
      res.json({ playlist });
    }
  } catch (error) {
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
});

app.get('/api/bluetooth', (req, res, next) => {
  fsp.readFile('data.json')
    .then((data) => {
      const json = JSON.parse(data);
      res.send(json.bluetooth);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.put('/api/bluetooth', (req, res, next) => {
  fsp.readFile('data.json')
    .then((data) => {
      const json = JSON.parse(data);

      // Get the connected file
      json.bluetooth.connectedDevice = Number(req.body.connectedDevice);
      fsp.writeFile('data.json', JSON.stringify(json))
      .then(() => {
        res.send({ connectedDevice: json.bluetooth.connectedDevice });
      })
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Data file not found or corrupt');
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});