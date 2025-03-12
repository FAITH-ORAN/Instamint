import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { bearerAuth } from "hono/bearer-auth"
import { HTTPException } from "hono/http-exception"
import { InvalidCredentialError } from "../../errors.js"
import hashPassword from "../../hashpassword.js"
import verifyToken from "../../middleware/auth.js"
import { resetPassword } from "../../validators.js"

const prisma = new PrismaClient()
const postReset = ({ app }) => {
  app.post(
    "/reset",
    bearerAuth({ verifyToken }),
    zValidator("json", resetPassword),
    async (c) => {
      const { newPassword, password } = await c.req.json()
      const { email } = c.req.session
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }

      if (newPassword !== password) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }

      const [passwordHash, passwordSalt] = hashPassword(password)
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          passwordHash,
          passwordSalt,
        },
      })

      return c.json({ message: "password reseted" })
    },
  )
}

export default postReset
