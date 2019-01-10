const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js');

const app = express();
const port = 3123;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/rooms/:roomids/', express.static(path.join(__dirname, '/../public')));

const findLatestPhoto = () => db.photoAdd.find({}).sort({ _id: 1 }).limit(1);

app.get('/house', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// app.post is undoable without rewriting the schema.
// he overwrites _id. Mongoose is not allowed to overwrite _id.
app.post('/house/post', async (req, res) => {
  const photoToCreate = req.body.photodetails;
  const photodetail = await db.photoAdd.create(photoToCreate);
  res.status(201).json(photodetail.toJSON());
});

app.put('/rooms/:roomids/put', (req, res) => {
  const query = { _id: req.params.id };
  const {
    title,
    prem,
    cost,
    picture,
    rcount,
    stars,
    beds,
    favorite,
    description,
  } = req.query;
  const changeOptions = {
    title, prem, cost, picture, rcount, stars, favorite, beds, description,
  };
  db.photoAdd.findOneAndUpdate(query, changeOptions, (err, data) => {
    if (err) {
      res.sendStatus(501);
    } else {
      res.sendStatus(200);
    }
  });
});
// if i had to write it, it would be like the one above.

app.delete('rooms/:roomsid/delete/', (req, res) => {
  db.photoAdd.remove({ _id: req.params.roomids }, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(501);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log('server is connected');
});
