const mongoose = require('mongoose');
const loremIpsum = require('lorem-ipsum');
const db = require('./index.js');

// mongoose.connect('mongodb://localhost/roomer', {}, (err)=>{
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log('connected')
//   }
// });

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

const seedGenerateor = (entries) => {
  const generatedData = [];
  for (let i = 1; i <= entries; i += 1) {
    const photo = {
      _id: i,
      title: sent,
      premium: randomBool,
      cost: randomNum(50, 200),
      picture: `https://s3-us-west-1.amazonaws.com/fec-ericmai-photos/fec+Photos/Bedroom+(${i}).jpg`,
      rcount: randomNum(20, 1500),
      stars: randomNum(1, 5),
      beds: randomNum(1, 7),
      favorite: randomBool,
      description: para,
    };
    generatedData.push(photo);
  }
  return generatedData;
};

const seeder = (data) => {
  db.photoAdd.deleteMany({}, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Zeroed out');
      db.photoAdd.insertMany(data).then();
    }
  });
};

const genData = seedGenerateor(100);
seeder(genData);
