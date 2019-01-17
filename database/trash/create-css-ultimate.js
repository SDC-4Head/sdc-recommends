/* const header = {
  id: '_id', //number
  title: 'title', //sent
  premium: 'premium', //randomBool
  cost: 'cost', // randomNum(50,200)
  picture: 'picture', //      `http://d1bah53dmo2q93.cloudfront.net/${i % 1000}.jpg`,
  rcount: 'rcount', // randomNum(20, 1500),
  stars: 'stars', //randomNum(1, 5),
  bed: 'beds', // randomNum(1, 7),
  favorite: 'favorite', //randomBool,

  description: 'description',//para,
}; */
const fs = require('fs');

const writer = fs.createWriteStream('./something.csv');

function writeToCSV(writer, data, encoding, callback) {
  const i = 1;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // last time!
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  }
}

writeToCSV(writer, data, 'utf8', () => {

});

// id int,
// title text,
// bed int,
// cost int,
// description text,
// favorite boolean,
// picture text,
// premium boolean,
// rcount int,
// stars int,
