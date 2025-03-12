import config from "./src/config.js"
import cronjob from "./src/utils/cron.js"
import run from "./src/run.js"

run(config)
cronjob()
