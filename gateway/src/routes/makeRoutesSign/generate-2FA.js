import { PrismaClient } from "@prisma/client"
import QRCode from "qrcode"
import { HTTPException } from "hono/http-exception"
import * as OTPAuth from "otpauth"

const prisma = new PrismaClient()
const generate2FA = ({ app }) => {
  app.post("/generate-2FA/:userId", async (c) => {
    try {
      const userId = c.req.param("userId")

      if (!userId) {
        throw new HTTPException(400, { res: "Invalid userId provided" })
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      })

      if (!user || !user.is2FAEnabled) {
        throw new HTTPException(401, {
          res: "2FA is not enabled for this user.",
        })
      }

      const otpSecret = new OTPAuth.Secret()
      const totp = new OTPAuth.TOTP({
        algorithm: "SHA1",
        label: "Instamint",
        issuer: "Instamint",
        secret: otpSecret.base32,
        digits: 6,
        period: 30,
      })
      const otpUri = totp.toString()
      const qrCodeDataURL = await QRCode.toDataURL(otpUri)
      await prisma.user.update({
        where: { id: Number(userId) },
        data: { otpSecret: otpSecret.base32 },
      })

      return c.json({ otpUri, qrCodeDataURL })
    } catch (error) {
      return c
        .json({ error: error.message || "Internal server error" })
        .status(error.statusCode || 500)
    }
  })
}

export default generate2FA
