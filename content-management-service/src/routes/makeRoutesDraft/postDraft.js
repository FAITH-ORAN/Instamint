import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const postDraft = (app) => {
  app.post("/draft", async (c) => {
    try {
      const body = await c.req.json().catch(() => null)

      if (!body) {
        return c.json({ error: "No request body" }, 400)
      }  
      
      const { contentId, description, authorName, hashtag, location } = await c.req.json()
      await prisma.content.update({
        where: { id: contentId },
        data: { status: "draft" }
      })
      const draftDetails = await prisma.draftDetails.create({
        data: {
          contentId,
          description,
          authorName,
          hashtag,
          location
        }
      })

      return c.json({
        message: "Draft created successfully",
        draftDetails
      })
    } catch (error) { 
return c.json({ error: "Failed to create draft" }, 500)
    }
  })
}

export default postDraft
