const logger = require("../startup/logger");

const testRouter = (req, res) => {
    logger.info("testRouter Called OK");
    res.json("Test Router OK");
}

module.exports = testRouter;