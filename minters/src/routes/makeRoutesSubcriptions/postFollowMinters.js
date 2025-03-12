import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"
import { followValidator } from "../../validators.js"

const prisma = new PrismaClient()
const postFollowMinters = ({ app }) => {
  app.post("/minter/follow", zValidator("json", followValidator), async (c) => {
    const { userIdA, userIdB } = await c.req.json()

    try {
      await prisma.subscription.create({
        data: {
          followerMinterId: userIdA,
          followingMinterId: userIdB,
          subscriptionDate: new Date(),
        },
      })

      return c.json({ result: "fowollowed" })
    } catch (error) {
      throw new HTTPException(401, { res: InvalidCredentialError })
    }
  })
}

export default postFollowMinters
