import { BlobServiceClient } from "@azure/storage-blob"
import { PrismaClient } from "@prisma/client"

const deleteUpload = (app) => {
  const prisma = new PrismaClient()

  app.delete("/upload/:contentId", async (c) => {
    const contentId = parseInt(c.req.param("contentId"), 10)

    if (!contentId || isNaN(contentId)) {
return c.json({ error: "Invalid Content ID" }, 400)
    }

    try {
      const content = await prisma.content.findUnique({
        where: { id: contentId },
      })

      if (!content) {
return c.json({ error: "Content not found" }, 404)
      }

      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      )
      const containerClient = blobServiceClient.getContainerClient(
        process.env.AZURE_ACCOUNT_CONTAINER
      )
      const blobName = new URL(content.contentUrl).pathname.split("/").pop()
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)

      await blockBlobClient.delete()

        if (content.status === "draft") {
        await prisma.draftDetails.delete({
          where: { contentId },
        })
      }

      await prisma.content.delete({
        where: { id: contentId },
      })


      return c.json({ message: "Content deleted successfully" }) 
    } catch (error) {
return c.json({ error: "Failed to delete content" }, 500)
    }
  })
}

export default deleteUpload
