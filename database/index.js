const { Pool, Client } = require('pg');
const path = require('path');

const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });


// const client = new Client()
// await client.connect()
const poolConfig = {
  user: process.env.PGDB_USER,
  host: process.env.PGDB_HOST,
  database: process.env.PGDB_DB,
  table: process.env.PGDB_TABLE,
  port: 5432,
};
const pool = new Pool(poolConfig);
pool.connect();
function getSample(n, callback) {
  const query = `SELECT * FROM ${poolConfig.table} TABLESAMPLE SYSTEM_ROWS(${n})`;
  // const query = 'select * from similars where room_id=100;';
  pool.query(query, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    console.log('pool was activated');
    const { rows } = data;
    callback(null, rows);
  });
}

module.exports = {
  getSample,
};
