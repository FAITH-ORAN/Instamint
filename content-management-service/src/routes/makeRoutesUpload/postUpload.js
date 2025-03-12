import { BlobServiceClient } from "@azure/storage-blob"
import { PrismaClient } from "@prisma/client"
import CryptoJS from "crypto-js"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()
const postUpload = (app) => {
  app.post("/upload", async (c) => {
    const userId = c.req.query("userId")

    try {
      const data = await c.req.formData()
      const file = data.get("file")

      if (!file) {
        return c.json({ error: "No file uploaded" }, 400)
      }

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "audio/mpeg",
        "video/mp4",
      ]

      if (!allowedTypes.includes(file.type)) {
        return c.json({ error: "File type not supported" }, 415)
      }

      if (file.size > 1024 * 1024 * 1024) {
        return c.json({ error: "File size exceeds limit" }, 413)
      }

      const blobName = `uploaded-${uuidv4()}-${file.name}`
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING,
      )
      const containerClient = blobServiceClient.getContainerClient(
        process.env.AZURE_ACCOUNT_CONTAINER,
      )
      const blockBlobClient = containerClient.getBlockBlobClient(blobName)
      const buffer = await file.arrayBuffer()
      const wordArray = CryptoJS.lib.WordArray.create(buffer)
      const hash = CryptoJS.SHA256(wordArray).toString()
      const existingContent = await prisma.content.findUnique({
        where: { contentHash: hash },
      })

      if (existingContent) {
        return c.json({ error: "File already exists" }, 409)
      }

      await blockBlobClient.uploadData(Buffer.from(buffer), {
        blobHTTPHeaders: { blobContentType: file.type },
      })

      const content = await prisma.content.create({
        data: {
          minterId: parseInt(userId, 10),
          fileSize: file.size,
          fileType: file.type,
          contentUrl: blockBlobClient.url,
          contentHash: hash,
          status: "uploaded",
        },
      })

      return c.json({
        message: "File uploaded successfully",
        contentId: content.id,
      })
    } catch (error) {
      return c.json({ error: "Failed to upload file" }, 500)
    }
  })
}

export default postUpload
