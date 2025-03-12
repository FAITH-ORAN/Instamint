import { PrismaClient } from "@prisma/client"
import winston from "winston"

const prisma = new PrismaClient()
const postMarket = (app) => {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  })
  app.post("/nft", async (c) => {
    try {
      const userId = c.req.query("userId")
      const nftId = c.req.query("nftId")
      const contentUrl = c.req.query("contentUrl")
      const marketplace = c.req.query("marketplace")

      if (!userId || !nftId || !contentUrl || !marketplace) {
        return c.json({ error: "Missing required fields" }, 400)
      }

      const newNFTMarket = await prisma.nFTMarket.create({
        data: {
          nftId: parseInt(nftId, 10),
          sellerId: parseInt(userId, 10),
          status: "listed",
          marketplaceName: marketplace,
          contentUrl,
          price: null,
        },
      })

      return c.json(
        { message: "NFTMarket entry created successfully", newNFTMarket },
        201,
      )
    } catch (error) {
      logger.error("Error creating NFTMarket entry:", error)

      return c.json({ error: "Failed to create NFTMarket entry" }, 500)
    }
  })
}

export default postMarket
