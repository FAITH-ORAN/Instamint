import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"
import { sanitizeMinter } from "../../sanitizers.js"
import { minterProfileValidator } from "../../validators.js"
const prisma = new PrismaClient()
const postCreateMinter = ({ app }) => {
  app.post("/minter", zValidator("json", minterProfileValidator), async (c) => {
    const { userId, language } = await c.req.json()

    try {
      const minter = await prisma.minterProfile.create({
        data: {
          idUser: userId,
          language,
        },
      })

      return c.json({ result: sanitizeMinter(minter) })
    } catch (error) {
      throw new HTTPException(401, { res: InvalidCredentialError })
    }
  })
}

export default postCreateMinter
