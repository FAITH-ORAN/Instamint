/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import { sign } from "hono/jwt"
import { InvalidCredentialError } from "../../errors.js"
import hashPassword from "../../hashpassword.js"
import { siginSchema } from "../../validators.js"

const prisma = new PrismaClient()
const postSignin = ({ app }) => {
  app.post("/sign-in", zValidator("json", siginSchema), async (c) => {
    try {
      const { email, password } = await c.req.json()
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new HTTPException(401, { res: "Invalid credentials" })
      }

      // If (user.isActive === false) {
      //   throw new HTTPException(403, {
      //     res: "Account not activated. Please check your e-mail to activate your account.",
      //   })
      // }

      const secret = process.env.SECURITY_SESSION_JWT_SECRET

      if (!secret) {
        return c.json({ error: "JWT secret is not defined" }).status(500)
      }

      if (
        user.is2FAEnabled &&
        (!user.otpSecret || user.otpSecret.trim() === "")
      ) {
        const tempPayload = {
          userId: user.id,
          email: user.email,
          password,
          exp: Math.floor(Date.now() / 1000) + 60 * 5,
        }
        const tempToken = await sign(tempPayload, secret)

        return c.json({ requires2FA: true, tempToken, userId: user.id })
      }

      const [passwordHash] = hashPassword(password, user.passwordSalt)

      if (user.passwordHash !== passwordHash) {
        throw new HTTPException(401, { res: InvalidCredentialError })
      }

      const payload = {
        id: user.id,
        email: user.email,
        fullName: user.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 5,
      }
      const token = await sign(payload, secret)

      return c.json({ token })
    } catch (err) {
      // eslint-disable-next-line no-undef
      if (err instanceof z.ZodError) {
        return c
          .json({ error: "Validation error", details: err.errors })
          .status(400)
      }

      return c.json({ error: "Unexpected error" }).status(500)
    }
  })
}

export default postSignin
