import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../error.js"
import { sanitizeMinter } from "../../sanitizers.js"
import { visibilityProfileValidator } from "../../validators.js"
const prisma = new PrismaClient()
const patchVisibilityMinterProfile = ({ app }) => {
  app.patch(
    "/minter/visibility",
    zValidator("json", visibilityProfileValidator),
    async (c) => {
      const { idMinter, visibility } = await c.req.json()

      try {
        const updatedMinter = await prisma.minterProfile.update({
          where: {
            id: idMinter,
          },
          data: {
            isProfileVisible: visibility,
          },
        })

        return c.json({ result: sanitizeMinter(updatedMinter) })
      } catch (error) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }
    },
  )
}

export default patchVisibilityMinterProfile
