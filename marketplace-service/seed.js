import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.nFTMarket.createMany({
    data: [
      {
        nftId: 1,
        sellerId: 1,
        status: "listed",
        marketplaceName: "Test Marketplace 1",
        contentUrl: "https://example.com/nft1.png",
        price: 0.5,
      },
      {
        nftId: 2,
        sellerId: 2,
        status: "listed",
        marketplaceName: "Test Marketplace 2",
        contentUrl: "https://example.com/nft2.png",
        price: 1.0,
      },
      {
        nftId: 3,
        sellerId: 3,
        status: "listed",
        marketplaceName: "Test Marketplace 3",
        contentUrl: "https://example.com/nft3.png",
        price: 1.5,
      },
    ],
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
