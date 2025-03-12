import { PrismaClient } from "@prisma/client"
import { HTTPException } from "hono/http-exception"

const prisma = new PrismaClient()
const check2FA = ({ app }) => {
  app.get("/check-2fa/:userId", async (c) => {
    try {
      const userId = c.req.param("userId")

      if (!userId) {
        throw new HTTPException(400, { res: "Invalid userId provided" })
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      })

      if (!user) {
        throw new HTTPException(404, { res: "User not found" })
      }

      return c.json({
        is2FAEnabled: user.is2FAEnabled,
        otpSecret: user.otpSecret || "",
      })
    } catch (error) {
      if (error instanceof HTTPException) {
        return c.status(error.statusCode).json({ error: error.message })
      }

      return c.status(500).json({ error: "Internal server error" })
    }
  })
}

export default check2FA
