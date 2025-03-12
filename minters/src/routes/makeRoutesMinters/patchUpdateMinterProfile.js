import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"
import { sanitizeMinter } from "../../sanitizers.js"
const prisma = new PrismaClient()
const patchUpdateMinterProfile = ({ app }) => {
  app.patch("/minter", async (c) => {
    const { idMinter, picture, bio } = await c.req.json()

    try {
      const updatedMinter = await prisma.minterProfile.update({
        where: {
          id: parseInt(idMinter, 10),
        },
        data: {
          ...(bio && { bio }),
          ...(picture && { picture }),
        },
      })

      return c.json({ result: sanitizeMinter(updatedMinter) })
    } catch (error) {
      throw new HTTPException(401, { res: InvalidCredentialError })
    }
  })
}

export default patchUpdateMinterProfile
