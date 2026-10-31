"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = require("./application/logging");
const web_1 = require("./application/web");
const port = 5000;
web_1.web.listen(port, () => {
    logging_1.logger.info(`Listen on port ${port}`);
});
