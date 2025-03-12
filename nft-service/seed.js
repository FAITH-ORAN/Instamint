import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.nFT.create({
    data: {
      userId: 1,
      contentId: 1,
      contentUrl: "https://res.cloudinary.com/dfqxbwfnc/image/upload/v1678691499/Airneis-Project/Capture_d_e%CC%81cran_2023-03-13_a%CC%80_08.08.28_unayyq.png",
      marketplace: "exampleMarketplace",
      minted: false,
      transactionHash: null,
    },
  })
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
