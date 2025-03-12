import { PrismaClient } from "@prisma/client"
import cron from "node-cron"
import { HTTPException } from "hono/http-exception"

const prisma = new PrismaClient()

export default function cronjob() {
  cron.schedule("0 0 */1 * * *", async () => {
    try {
      await prisma.user.deleteMany({
        where: {
          isActive: false,
        },
      })
    } catch (error) {
      throw new HTTPException(401, {
        res: "Error deleting users :",
        error,
      })
    }
  })
}
