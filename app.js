const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3001;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.listen(port, () => {
  console.log(`Proxy Server listening on port: ${port}...`);
});

app.get('/streamers/random', (req, res) => {
  console.log('Fetching data on Random Streamer...');
  axios.get('http://localhost:8001/streamers/random')
    .then((responsefromService) => {
      console.log(Object.keys(responsefromService.data));
      res.send(responsefromService.data);
    })
});

app.get('/api/get', (req, res) => {
  axios.get('http://localhost:3000/api/get')
    .then((responsefromService) => {
      console.log(Object.keys(responsefromService.data));
      res.send(responsefromService.data);
    });
})

app.put('/streamers/:name', (req, res) => {
  const streamerName = req.params.name;
  const updateObject = req.body;
  
  axios.put(`http://localhost:8001/streamers/${streamerName}`, updateObject)
    .then((responsefromService) => {
      res.send(responsefromService.data);
    })
  console.log(`Updating follower count on ${streamerName} : `, updateObject.amount);
});