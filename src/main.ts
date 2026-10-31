import { logger } from "./application/logging";
import { web } from "./application/web";

const port = 5000;
web.listen(port, () => {
  logger.info(`Listen on port ${port}`);
});
