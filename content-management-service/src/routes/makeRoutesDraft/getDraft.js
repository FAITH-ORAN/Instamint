import { PrismaClient } from "@prisma/client"

const getDraft = (app) => {
  const prisma = new PrismaClient()

  app.get("/draft/:contentId", async (c) => {
    const contentId = parseInt(c.req.param("contentId"), 10)

    if (!contentId || isNaN(contentId)) {
      return c.json({ error: "Invalid or missing Content ID" }, 400)
    }

    try {
      const draft = await prisma.draftDetails.findUnique({
        where: { contentId },
      })

      if (!draft) {
        return c.json({ error: "Draft not found" }, 404)
      }

      return c.json(draft)
    } catch (error) {
      return c.json({ error: "Failed to retrieve draft" }, 500)
    }
  })
}

export default getDraft