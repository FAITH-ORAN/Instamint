import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const updateStatus = (app) => {
  app.put("/update-status/:contentId", async (c) => {
    try {
      const contentId = c.req.param("contentId")
      const { status } = await c.req.json()

      if (!contentId || !status) {
        return c.json({ error: "Missing contentId or status" }, 400)
      }

      await prisma.content.update({
        where: { id: parseInt(contentId,10) },
        data: { status }
      })

      return c.json({ message: "Content status updated successfully" })
    } catch (error) {
      return c.json({ error: "Failed to update content status" }, 500)
    }
  })
}

export default updateStatus
