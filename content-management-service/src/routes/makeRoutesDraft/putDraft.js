import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const validateRequest = (req) => {
  const contentId = parseInt(req.param("contentId"), 10)

  if (!contentId || isNaN(contentId)) {
    return { error: "Invalid or missing Content ID" }
  }

  return { contentId }
}
const validateRequestBody = (body) => {
  const { description, authorName, hashtag, location } = body

  if (!description || !authorName || !Array.isArray(hashtag) || !location) {
    return { error: "Missing or invalid fields in request body" }
  }

  return { description, authorName, hashtag, location }
}
const findDraft = async (contentId) => {
  const draft = await prisma.draftDetails.findUnique({
    where: { contentId },
  })

  if (!draft) {
    return { error: "Draft not found" }
  }

  return { draft }
}
const updateDraft = async (contentId, data) => {
  const updatedDraft = await prisma.draftDetails.update({
    where: { contentId },
    data,
  })

  return updatedDraft
}
const putDraft = (app) => {
  app.put("/draft/:contentId", async (c) => {
    const { contentId, error: validationError } = validateRequest(c.req)

    if (validationError) {
      return c.json({ error: validationError }, 400)
    }

    const body = await c.req.json()
    const { error: bodyError, ...data } = validateRequestBody(body)

    if (bodyError) {
      return c.json({ error: bodyError }, 400)
    }

    const { error: findError } = await findDraft(contentId)

    if (findError) {
      return c.json({ error: findError }, 404)
    }

    try {
      const updatedDraft = await updateDraft(contentId, data)

      
return c.json(updatedDraft)
    } catch (error) {
      return c.json({ error: "Failed to update draft" }, 500)
    }
  })
}

export default putDraft
