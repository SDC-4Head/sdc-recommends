const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/houses', {}, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('im connected?');
});

const photoCaraSchema = mongoose.Schema({
  _id: { type: Number, unique: true, index: true },
  title: String,
  prem: Boolean,
  cost: Number,
  picture: String,
  rcount: Number,
  stars: Number,
  beds: Number,
  favorite: Boolean,
  description: String,
});

const photoAdd = mongoose.model('similars', photoCaraSchema);

const find = (data, callback) => {
  photoAdd.aggregate([{ $sample: { size: 10 } }], callback);
};

module.exports = {
  photoAdd,
  find,
};
