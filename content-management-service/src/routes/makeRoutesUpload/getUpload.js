import { PrismaClient } from "@prisma/client"

const getUpload = (app) => {
  const prisma = new PrismaClient()

  app.get("/upload/:userId", async (c) => {
    const userId = parseInt(c.req.param("userId"), 10)

    if (!userId || isNaN(userId)) {
      return c.json({ error: "Invalid or missing User ID" }, 400)
    }

    try {
      const contents = await prisma.content.findMany({
        where: { minterId: userId },
        orderBy: { uploadedAt: "desc" },
      })

      return c.json(contents)
    } catch (error) {
      return c.json({ error: "Failed to retrieve contents" }, 500)
    }
  })
}

export default getUpload
