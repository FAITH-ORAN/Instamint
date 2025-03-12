import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import { InvalidCredentialError } from "../../errors.js"
import emailChangeProducer from "../../producer/emailChangeProducer.js"
import { emailChange } from "../../validators.js"

const prisma = new PrismaClient()
const requestEmailChange = ({ app }) => {
  app.post(
    "/request-email-change",
    zValidator("json", emailChange),
    async (c) => {
      const { oldEmail, newEmail } = await c.req.json()
      const user = await prisma.user.findUnique({
        where: {
          email: oldEmail,
        },
      })

      if (!user) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }

      const payload = {
        userId: user.id,
        email: newEmail,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      }
      const token = await sign(payload, process.env.SECURITY_SESSION_JWT_SECRET)
      await emailChangeProducer(newEmail, token)

      return c.json({ result: "token" })
    },
  )
}

export default requestEmailChange
