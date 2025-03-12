import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import { InvalidCredentialError } from "../../errors.js"
import { sendResetPasswordData } from "../../producer/resetPasswordProducer.js"
import { requestResetPassword } from "../../validators.js"

const prisma = new PrismaClient()
const postResetPassword = ({ app }) => {
  app.post(
    "/reset-password",
    zValidator("json", requestResetPassword),
    async (c) => {
      const { email } = await c.req.json()
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }

      const payload = {
        email,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      }
      const token = await sign(payload, process.env.SECURITY_SESSION_JWT_SECRET)
      await sendResetPasswordData(email, token, user.username)

      return c.json({ result: token })
    },
  )
}

export default postResetPassword
