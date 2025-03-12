/* eslint-disable complexity */
import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"
import hashPassword from "../../hashpassword.js"

const prisma = new PrismaClient()
const requestPasswordChange = ({ app }) => {
  app.post("/request-password-change", async (c) => {
    try {
      if (!c.req || !c.req.json) {
        throw new HTTPException(400, {
          message: "Invalid request data",
          code: "INVALID_REQUEST_DATA",
        })
      }

      const { id, currentPassword, newPassword, confirmPassword } =
        await c.req.json()
      const userId = parseInt(id, 10)
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        throw new HTTPException(401, {
          message: "Invalid credentials",
          code: "INVALID_CREDENTIALS",
        })
      }

      if (!currentPassword.trim()) {
        throw new HTTPException(400, {
          message: "Current password is required",
          code: "MISSING_CURRENT_PASSWORD",
        })
      }

      const trimmedCurrentPassword = currentPassword.trim()
      const [passwordHash] = hashPassword(
        trimmedCurrentPassword,
        user.passwordSalt,
      )

      if (user.passwordHash !== passwordHash) {
        throw new HTTPException(400, {
          message: "Invalid current password",
          code: "INVALID_PASSWORD",
        })
      }

      const trimmedNewPassword = newPassword.trim()
      const trimmedConfirmPassword = confirmPassword.trim()

      if (trimmedNewPassword !== trimmedConfirmPassword) {
        throw new HTTPException(400, {
          message: "Passwords do not match",
          code: "PASSWORDS_DO_NOT_MATCH",
        })
      }

      const [hashedNewPassword, newSalt] = hashPassword(
        trimmedNewPassword,
        user.passwordSalt,
      )

      await prisma.user.update({
        where: { id: userId },
        data: {
          passwordHash: hashedNewPassword,
          passwordSalt: newSalt,
        },
      })

      return c.json({ result: "Password changed successfully" })
    } catch (error) {
      if (error instanceof HTTPException) {
        return c.status(error.statusCode).json({
          error: error.message,
          code: error.code,
        })
      }

      return c.status(500).json({ error: "Internal Server Error" })
    }
  })
}

export default requestPasswordChange
