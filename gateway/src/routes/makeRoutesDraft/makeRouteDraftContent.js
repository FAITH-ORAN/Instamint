import { jwt } from "hono/jwt"
import getDraftContent from "./getDraftContent.js"
import postDraftContent from "./postDraftContent.js"
import putDraftContent from "./putDraftContent.js"

const makeRoutesDraftContent = (app) => {
  app.use(
    "/draft",
    jwt({
      secret: process.env.SECURITY_SESSION_JWT_SECRET,
      key: "jwtPayload",
    }),
  )

  app.get("/draft/:contentId", getDraftContent)
  app.put("/draft/:contentId", putDraftContent)
  app.post("/draft", postDraftContent) 
}

export default makeRoutesDraftContent
