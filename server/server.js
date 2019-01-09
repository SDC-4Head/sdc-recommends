const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3123;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/rooms/:roomids/', express.static(path.join(__dirname, '/../public')));

app.get('/house', (req, res) => {
  db.find({}, (err, data) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log('server is connected');
});
