import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"

const prisma = new PrismaClient()
const toggle2FA = ({ app }) => {
  app.put("/toggle-2fa/:userId", async (c) => {
    try {
      const userId = c.req.param("userId")
      const { is2FAEnabled } = await c.req.json()

      if (!userId) {
        throw new HTTPException(400, { res: "Invalid userId provided" })
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      })

      if (!user) {
        throw new HTTPException(404, { res: "User not found" })
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          is2FAEnabled,
          otpSecret: is2FAEnabled ? user.otpSecret : null,
        },
      })

      return c.json({ is2FAEnabled: updatedUser.is2FAEnabled })
    } catch (error) {
      if (error instanceof HTTPException) {
        return c.status(error.statusCode).json({ error: error.message })
      }

      return c.status(500).json({ error: "Internal server error" })
    }
  })
}

export default toggle2FA
