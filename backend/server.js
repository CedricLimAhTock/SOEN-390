const express = require('express');
const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('SOEN 390 BACKEND');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
