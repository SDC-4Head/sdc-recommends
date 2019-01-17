const fs = require('fs');
const loremIpsum = require('lorem-ipsum');

const randomBool = () => Math.random() >= 0.5;

const randomNum = (from, to) => Math.floor(Math.random() * to + 1) + from;

const writeHead = stream => new Promise((resolve, reject) => {
  const data = [
    'room_id',
    'room_name',
    'bed',
    'cost',
    'description',
    'favorite',
    'picture',
    'premium',
    'rcount',
    'stars',
    'title',
  ];
  stream.write(`${data.join(',')}\n`, 'utf8');
});

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
const generate = (filepath, rowsToCreate, rowsInterval) => {
  // if there is stream stoppage, pause then write
  let i = 0;
  let page = -1;
  let stream;
  function createDataLine() {
    const data = [
      i, // room_id
      `room${i}`, // room_name
      randomNum(1, 7), // bed
      randomNum(50, 200), // cost
      loremIpsum(paraConfig), // description
      randomBool(), // favorite
      `http://d1bah53dmo2q93.cloudfront.net/${i % 1000}.jpg`, // picture
      randomBool(), // premium
      randomNum(20, 1500), // rcount
      randomNum(1, 5), // star
      loremIpsum(sentConfig),
    ];
    return `${data.join(',')}\n`;
  }

  const write = () => {
    let shouldContinue = true;
    while (i <= rowsToCreate && shouldContinue) {
      if (i % rowsInterval === 0) {
        page += 1;
        stream = fs.createWriteStream(`${filepath}heck${page}.csv`, { flags: 'w' });
        writeHead(stream);
      }
      shouldContinue = stream.write(createDataLine());
      i += 1;
    }
    if (!shouldContinue) {
      stream.once('drain', () => {
        write();
      });
    }
  };
  write();
};
generate('../datapostgre/', 10000000, 1500000);
