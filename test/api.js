const test = require('node:test');
const assert = require('node:assert/strict');

const api = require('..');
const { makeFetch } = require('supertest-fetch');

const fetch = makeFetch(api);

test('must return 404 on invalid URL', async function () {
  await fetch('/unknown')
    .expect(404);
});

test('must parse address', async function () {
  const data = await fetch('/parse?address=781+Franklin+Ave+Crown+Hts+Brooklyn+NY')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8')
    .json();
  assert.deepEqual(data, [
    {
      "label": "house_number",
      "value": "781"
    },
    {
      "label": "road",
      "value": "franklin ave"
    },
    {
      "label": "suburb",
      "value": "crown hts"
    },
    {
      "label": "city_district",
      "value": "brooklyn"
    },
    {
      "label": "state",
      "value": "ny"
    }
  ]);
});

test('must expand address', async function () {
  const data = await fetch('/expand?address=781+Franklin+Ave+Crown+Hts+Brooklyn+NY')
    .expect(200)
    .expect('content-type', 'application/json; charset=utf-8')
    .json();
  assert.deepEqual(data, [
    '781 franklin avenue crown heights brooklyn ny',
    '781 franklin avenue crown heights brooklyn new york'
  ]);
});
