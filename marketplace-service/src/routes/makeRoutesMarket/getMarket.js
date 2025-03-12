import { PrismaClient } from "@prisma/client"

const getAllNFTMarket = (app) => {
  const prisma = new PrismaClient()

  app.get("/nft-market", async (c) => {
    try {
      const nfts = await prisma.nFTMarket.findMany({
        // eslint-disable-next-line camelcase
        orderBy: { created_at: "desc" },
      })

      return c.json(nfts)
    } catch (error) {
      return c.json({ error: "Failed to retrieve NFT market data" }, 500)
    }
  })
}

export default getAllNFTMarket
