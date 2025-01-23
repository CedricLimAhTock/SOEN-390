const express = require('express');

const logger = require("./startup/logger");
const app = express();
const port = 4001;


require("./startup/routes")(app);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
