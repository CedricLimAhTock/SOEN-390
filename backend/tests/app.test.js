jest.mock('../app', () => {
    const express = require('express');
    const app = express();
    app.listen = jest.fn();
    return app;
  });
  