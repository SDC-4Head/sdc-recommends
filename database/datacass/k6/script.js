import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 200,
  duration: '600s',
  rps: 2000,
};

const randomRoom = Math.floor(Math.random() * (1000000) + 8500000);
export default function () {
  const res = http.get(`http://localhost:3123/rooms/${randomRoom}/house`);

  check(res, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
  });
  sleep(0.1);
}
