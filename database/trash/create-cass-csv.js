const stringify = require('csv-stringify');
const loremIpsum = require('lorem-ipsum');
const Fs = require('fs');

const para = loremIpsum({
  count: 1,
  units: 'paragraph',
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  paragraphLowerBound: 3,
  paragraphUpperBound: 7,
  format: 'plain',
  random: Math.random,
});

const sent = loremIpsum({
  count: 1,
  units: 'sentences',
  sentenceLowerBound: 5,
  sentenceUpperBound: 15,
  format: 'plain',
  random: Math.random,
});

const randomBool = Math.random() >= 0.5;
const randomNum = (from, to) => Math.floor(Math.random() * to + 1) + from;
const header = {
  id: '_id',
  title: 'title',
  premium: 'premium',
  cost: 'cost',
  picture: 'picture',
  rcount: 'rcount',
  stars: 'stars',
  bed: 'beds',
  favorite: 'favorite',
  description: 'description',
};

const seedGenerateor = (entries) => {
  const generatedData = [];
  for (let i = 1; i <= entries; i += 1) {
    const photo = [
      i,
      sent,
      randomBool,
      randomNum(50, 200),
      `http://d1bah53dmo2q93.cloudfront.net/${i % 1000}.jpg`,
      randomNum(20, 1500),
      randomNum(1, 5),
      randomNum(1, 7),
      randomBool,
      para,
    ];
    generatedData.push(photo);
  }
  return generatedData;
};

const genData = seedGenerateor(500000);
stringify(genData, { header: true, columns: header }, (err, output) => {
  if (err) throw err;
  Fs.appendFileSync('./myo.csv', output, (err) => {
    if (err) throw err;
    console.log('my.csv saved.');
  });
});
