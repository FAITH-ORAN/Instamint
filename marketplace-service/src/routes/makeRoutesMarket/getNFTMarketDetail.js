import { PrismaClient } from "@prisma/client"

const getNFTMarketDetail = (app) => {
  const prisma = new PrismaClient()
 app.get("/nft-market/:nftId", async (c) => {
    const nftId = parseInt(c.req.param("nftId"), 10)

    if (!nftId || isNaN(nftId)) {
      return c.json({ error: "Invalid or missing NFT ID" }, 400)
    }

    try {
      const nft = await prisma.nFTMarket.findUnique({
        where: { nftId },
      })

      if (!nft) {
        return c.json({ error: "NFT not found" }, 404)
      }

      return c.json(nft)
    } catch (error) {
      return c.json({ error: "Failed to retrieve NFT market detail" }, 500)
    }
  })
}

export default getNFTMarketDetail