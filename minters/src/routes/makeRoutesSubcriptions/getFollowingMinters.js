import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"

const prisma = new PrismaClient()
const getFollowingMinters = ({ app }) => {
  app.get("/minter/following/:userId", async (c) => {
    const userId = c.req.param("userId")

    try {
      const numberFollowers = await prisma.subscription.count({
        where: {
          followingMinterId: parseInt(userId, 10),
        },
      })

      return c.json({ result: numberFollowers })
    } catch (error) {
      throw new HTTPException(401, { res: InvalidCredentialError })
    }
  })
}

export default getFollowingMinters
