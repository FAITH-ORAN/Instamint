/* eslint-disable max-lines-per-function */
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
import * as OTPAuth from "otpauth"
import { HTTPException } from "hono/http-exception"
import { ForbiddenError } from "../../errors.js"

const prisma = new PrismaClient()
const verify2FA = ({ app }) => {
  app.post("/verify-2FA", async (c) => {
    const { tempToken, otp } = await c.req.json()
    const secret = process.env.SECURITY_SESSION_JWT_SECRET

    if (!secret) {
      return c.json({ error: "JWT secret is not defined" }).status(500)
    }

    try {
      const decoded = jwt.verify(tempToken, secret)
      const { email, password } = decoded
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user || !user.is2FAEnabled) {
        return c
          .json({ error: "2FA is not enabled for this user." })
          .status(401)
      }

      if (user.isActive === false) {
        throw new HTTPException(403, {
          res: ForbiddenError,
        })
      }

      const totp = new OTPAuth.TOTP({
        secret: OTPAuth.Secret.fromBase32(user.otpSecret),
        label: "Instamint",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
      })
      const validated = totp.validate({ token: otp })

      if (validated !== null) {
        const permanentPayload = {
          id: user.id,
          email: user.email,
          fullName: user.username,
          exp: Math.floor(Date.now() / 1000) + 60 * 5,
        }
        const permanentToken = await jwt.sign(permanentPayload, secret)

        return c.json({
          token: permanentToken,
          email,
          password,
        })
      }

      return c.json({ error: "Invalid OTP" }).status(401)
    } catch (error) {
      return c.json({ error: "Invalid token or OTP" }).status(401)
    }
  })
}

export default verify2FA
