import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import makeRoutesNft from "./routes/makeRoutesNFT/makeRoutesNft.js"


const run = () => {
  const app = new Hono()

  app.use("*", cors())
  app.use(logger())
  app.use(prettyJSON())

  makeRoutesNft(app)
  app.onError((err, c) => c.json({ error: err.message }, err.statusCode || 500))

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
