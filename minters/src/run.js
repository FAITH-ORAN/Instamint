import { serve } from "@hono/node-server"
import "dotenv/config"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import makeRoutesMinters from "./routes/makeRoutesMinters/makeRoutesMinters.js"
import makeRoutesSubcriptions from "./routes/makeRoutesSubcriptions/makeRoutesSubcriptions.js"
const run = () => {
  const app = new Hono()
  app.use("*", cors())
  app.use(logger())
  app.use(prettyJSON())
  makeRoutesMinters({ app })
  makeRoutesSubcriptions({ app })
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
