const loremIpsum = require('lorem-ipsum');

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1;
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
const fs = require('fs');

const writeHead = () => new Promise((resolve, reject) => {
  const data = 'id,title,bed,cost,description,favorite,picture,premium,rcount,stars\n';
  fileStream.write(data, 'utf8');
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
const fileStream = fs.createWriteStream('../data/beta1.csv', { flags: 'a' });
const paraConfig = {
  count: 1,
  units: 'paragraph',
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  paragraphLowerBound: 3,
  paragraphUpperBound: 7,
  format: 'plain',
  random: Math.random,
};
const sentConfig = {
  count: 1,
  units: 'sentences',
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  format: 'plain',
  random: Math.random,
};

const sent = loremIpsum;
const randomBool = () => Math.random() >= 0.5;
const randomNum = (from, to) => Math.floor(Math.random() * to + 1) + from;
writeHead();
for (let i = 1000000; i < 3000000; i += 1) {
  const data = `${i},${sent(sentConfig)},${randomNum(1, 7)},${randomNum(50, 200)},${sent(paraConfig)},${randomBool()},http://d1bah53dmo2q93.cloudfront.net/${i % 1000}.jpg,${randomBool()},${randomNum(20, 1500)},${randomNum(1, 5)}\n`;
  writeOneMillionTimes(fileStream, data, 'utf8', () => {
    console.log(`entry #${i}`);
  });
}
