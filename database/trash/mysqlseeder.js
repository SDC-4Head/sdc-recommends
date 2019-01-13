const mysql = require('mysql');
require('dotenv').config();

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'photoSuggestions',
};

const connection = mysql.createConnection(mysqlConfig);
connection.connect();
// open the connection
// create the schema
// populate an array of an objects in chunks

const queryString = sql``;
connection.query(queryString, (error, results) => {
  if (error) {
    console.log(error, 'youve failed'); // mariodelete
  }
});
