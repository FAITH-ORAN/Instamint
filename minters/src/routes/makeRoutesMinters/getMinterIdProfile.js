import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"
import { getminterIdProfileValidator } from "../../validators.js"

const prisma = new PrismaClient()
const getMinterIdProfile = ({ app }) => {
  app.get(
    "/minter/:userId",

    zValidator("param", getminterIdProfileValidator),
    async (c) => {
      const { userId } = await c.req.param()

      try {
        const minter = await prisma.minterProfile.findFirst({
          where: {
            idUser: parseInt(userId, 10),
          },
        })

        return c.json({ result: minter.id })
      } catch (error) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }
    },
  )
}

export default getMinterIdProfile
