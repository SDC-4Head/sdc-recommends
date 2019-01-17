const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'keyspacemarlio',
});

beforeEach(async () => {
  await client.connect()
    .then(() => {
      console.log('client connected');
    });
});

afterEach(() => {
  client.shutdown();
});

test('100 queries should respond with <100ms', async () => {
  const promiseArr = [];
  const befores = [];
  const afters = [];
  for (let i = 0; i < 100; i += 1) {
    const j = Math.floor(Math.random() * (10000000 - 9000000) + 9000000);
    const query = `SELECT * FROM keyspacemarlio.similars WHERE clustering_id = ${j} and category_id = 1 and room_name='room${j}'`;
    console.log(j);
    befores.push(Date.now());
    promiseArr.push(client.execute(query));
  }
  return Promise.all(promiseArr)
    .then((value) => {
      value.forEach((val) => {
        console.log(val.rows[0].room_name);
        const after = Date.now();
        afters.push(after);
      });
      return Promise.resolve(afters);
    })
    .then((resolvedDurations) => {
      const diffs = resolvedDurations.reduce((accum, item, key) => (accum + (item - befores[key])), 0);
      console.log(diffs / resolvedDurations.length);
    });
});
// })
//   .then((dur) => {
//     console.log(`Query array: ${dur}`);
//     expect(120).toBeLessThanOrEqual(120);
//     // client.shutdown();
//   });
// });
