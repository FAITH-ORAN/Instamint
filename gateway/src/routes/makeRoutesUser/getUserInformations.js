import { zValidator } from "@hono/zod-validator"
import { PrismaClient } from "@prisma/client"
import { sanitizeUser } from "../../sanitizers.js"
import { userInformationSchema } from "../../validators.js"

const prisma = new PrismaClient()
const getUserInformation = ({ app }) => {
  app.get(
    "/user/:userId",
    zValidator("param", userInformationSchema),
    async (c) => {
      const { userId } = c.req.param()
      const user = await prisma.user.findFirst({
        where: {
          id: Number.parseInt(userId, 10),
        },
      })

      return c.json({ result: sanitizeUser(user) })
    },
  )
}

export default getUserInformation
