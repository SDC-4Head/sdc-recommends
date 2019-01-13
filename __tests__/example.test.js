const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'keyspacemarlio',
});

beforeEach(async () => {
  await client.connect();
});

afterEach(() => {
  client.shutdown();
});

test('100 queries should respond with <100ms', () => {
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
      const duration = after - before;
      console.log(`Query time: ${duration}ms`);
      expect(duration).toBeLessThanOrEqual(120);
      // client.shutdown();
    });
});
