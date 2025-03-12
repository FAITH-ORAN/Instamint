import { jwt } from "hono/jwt"
import postNFT from "./postNFT.js"


const makeRoutesNFT = (app) => {
  app.use(
    "/nft",
    jwt({
      secret: process.env.SECURITY_SESSION_JWT_SECRET,
      key: "jwtPayload",
    }),
  )

  app.post("/nft", postNFT) 
}

export default makeRoutesNFT
