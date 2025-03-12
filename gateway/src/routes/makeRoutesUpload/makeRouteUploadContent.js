import { jwt } from "hono/jwt"
import deleteUploadContent from "./deleteUploadContent.js"
import getUploadContent from "./getUploadContent.js"
import postUploadContent from "./postUploadContent.js"

const makeRoutesUploadContent = (app) => {
  app.use(
    "/upload",
    jwt({
      secret: process.env.SECURITY_SESSION_JWT_SECRET,
      key: "jwtPayload",
    }),
  )

  app.get("/upload/:userId", getUploadContent)
  app.get("/uploaded-content/:contentId", getUploadContent)
  app.post("/upload", postUploadContent)
  app.delete("/upload/:contentId", deleteUploadContent)
}

export default makeRoutesUploadContent
