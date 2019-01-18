const { Pool, Client } = require('pg');

require('dotenv').config();

// const poolConfig = {
//   user: process.env.DBPG_USER,
//   host: process.env.DBPG_HOST,
//   database: dbmarlios,
// }

const pool = new Pool({
  user: 'ykmmui',
  host: 'localhost',
  database: 'dbmarlio',
  port: 5432,
});

//
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });
const timer = () => new Promise((resolve, reject) => {
  console.log('1');
  resolve(console.time());
});

const getById = (query, queryArgs, callback) => new Promise((resolve, reject) => {
  pool.query(query, queryArgs, (err, res) => {
    if (err) {
      throw err;
    }
    // console.log(res.rows[0]);
    // pool.end();
    resolve(callback(null, res.rows[0]));
  });
});

// const queryArgs = ['hey', 'hey'];
const query = 'SELECT * from similars where room_id = $1'; // select query
// const query = 'INSERT INTO similars (title, description) values($1,$2)';
const queryArgs = [Math.floor((Math.random() * (10000000 - 9000000)) + 9000000)];
// console.log(queryArgs);

// get limit to 1 of a random 10% lower of 10 million queries.
// const query = 'SELECT * from similars LIMIT 1 OFFSET\
// (SELECT max(room_id) from similars) * .90';

function foo(query, queryArgs) {
  timer()
    .then(() => getById(query, queryArgs, (err, data) => {
      console.log(data);
      console.timeEnd();
    }))
    .then(() => {
      console.log('end');
      pool.end();
    });
}
foo(query, queryArgs);
