import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"

const prisma = new PrismaClient()
const getFollowersMinters = ({ app }) => {
  app.get("/minter/followers/:userId", async (c) => {
    const userId = c.req.param("userId")

    try {
      const numberOfFollowing = await prisma.subscription.count({
        where: {
          followerMinterId: parseInt(userId, 10),
        },
      })

      return c.json({ result: numberOfFollowing })
    } catch (error) {
      throw new HTTPException(401, { res: InvalidCredentialError })
    }
  })
}

export default getFollowersMinters
