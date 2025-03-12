import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { HTTPException } from "hono/http-exception"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import makeRoutesDraftContent from "./routes/makeRoutesDraft/makeRouteDraftContent.js"
import makeRoutesMarket from "./routes/makeRoutesMarketPlace/makeRoutesMarket.js"
import makeRoutesNFT from "./routes/makeRoutesNFT/makeRoutesNFT.js"
import makeRoutesReset from "./routes/makeRoutesReset/makeRoutesReset.js"
import makeRoutesSign from "./routes/makeRoutesSign.js"
import makeRoutesUploadContent from "./routes/makeRoutesUpload/makeRouteUploadContent.js"
import makeRoutesUser from "./routes/makeRoutesUser.js"

const run = () => {
  const app = new Hono()

  app.use("*", cors())
  app.use(logger())
  app.use(prettyJSON())

  app.all("/api/minter/*", (c) => {
    const rewrite = c.req.path.replace("/api", "")

    return c.redirect(`${process.env.MINTER_SERVICE_URL}${rewrite}`, 308)
  })

  makeRoutesSign({ app })
  makeRoutesReset({ app })
  makeRoutesUploadContent(app)
  makeRoutesDraftContent(app)
  makeRoutesNFT(app)
  makeRoutesUser({ app })
  makeRoutesMarket(app)

  app.onError((err) => {
    if (err instanceof HTTPException) {
      return err.getResponse()
    }

    return err
  })

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
