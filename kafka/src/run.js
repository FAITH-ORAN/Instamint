import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import changeEmailConsumes from "./services/changeEmailConsumes.js"
import createMinterConsumer from "./services/createMinterConsumes.js"
import createNFTConsumes from "./services/createNFTConsumes.js"
import resetPasswordConsumer from "./services/resetPasswordConsumes.js"
import consumerEmail from "./services/signupConsumes.js"
// eslint-disable-next-line require-await
const run = async () => {
  const app = new Hono()

  app.use("*", cors())
  app.use(logger())
  app.use(prettyJSON())

  app.onError((err, c) => c.json({ error: err.message }, err.statusCode || 500))

  resetPasswordConsumer()
  consumerEmail()
  createMinterConsumer()
  createNFTConsumes()
  changeEmailConsumes()
  serve(
    {
      fetch: app.fetch,
      port: process.env.PORT,
    },
    (info) => {
      // eslint-disable-next-line no-console
      console.log(`Listening on http://localhost:${info.port}`)
    },
  )
}

export default run
