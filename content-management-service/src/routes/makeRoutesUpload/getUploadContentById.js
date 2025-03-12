import { PrismaClient } from "@prisma/client"

const getUploadContentById = (app) => {
  const prisma = new PrismaClient()

  app.get("/uploaded-content/:contentId", async (c) => {
    const contentId = parseInt(c.req.param("contentId"), 10)

    if (!contentId || isNaN(contentId)) {
      return c.json({ error: "Invalid or missing User ID" }, 400)
    }

    try {
      const content = await prisma.content.findFirst({
        where: { id: contentId },
      })

      return c.json(content)
    } catch (error) {
      return c.json({ error: "Failed to retrieve contents" }, 500)
    }
  })
}

export default getUploadContentById
