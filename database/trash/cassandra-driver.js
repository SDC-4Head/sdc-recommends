const cassandra = require('cassandra-driver');
const execSync = require('child_process').execSync;

const client = new cassandra.Client({ contactPoints: ['localhost'], localDataCenter: 'datacenter1', keyspace: 'keyspacemarlio' });

// const copyQuery = 'COPY similar (id, title, bed, cost, description, favorite, picture, premium, rcount, starts ) FROM ./test01.csv WITH HEADER = TRUE ;';
// const query = 'SELECT * FROM similars WHERE id=1';
// // const id = [1];
// client.execute(query, [], { prepare: true })
//   .then(result => console.log('User with email %s', result.rows[0].title))
//   .then(() => {
//     client.shutdown();
//   });
const foo = async () => {
  await client.connect();
  const before = Date.now();
  const promiseArr = [];

  for (let i = 0; i < 100; i += 1) {
    const query = `SELECT * FROM keyspacemarlio.similars WHERE id = ${i} ALLOW FILTERING`;
    promiseArr.push(client.execute(query));
  }

  Promise.all(promiseArr)
    .then(value => value.forEach((val) => {
      console.log(val.rows[0].title);
    }))
    .then(() => {
      const after = Date.now();
      console.log(`Query time: ${after - before}ms`);
      client.shutdown();
    });
};
foo();


// import { execSync } from 'child_process';  // replace ^ if using ES modules

// const output = execSync('./mario.sh', { encoding: 'utf-8' }); // the default is 'buffer'

// console.log('Output was:\n', output);
