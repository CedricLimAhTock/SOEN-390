const request = require('supertest');
const express = require('express');
const routes = require('../startup/routes');
const { json } = require('body-parser');

const app = express();
routes(app);

describe('GET /test', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe,json('Test Router OK');
  });
});