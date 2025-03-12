import { PrismaClient } from "@prisma/client"
import { verify } from "hono/jwt"
import { sanitizeUser } from "../../sanitizers.js"

const prisma = new PrismaClient()
const resetEmail = ({ app }) => {
  app.get("/verify-email-change", async (c) => {
    const { token } = c.req.query()
    const { userId, email } = await verify(
      token,
      process.env.SECURITY_SESSION_JWT_SECRET,
    )
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
      },
    })

    return c.json({ result: sanitizeUser(updatedUser) })
  })
}

export default resetEmail
