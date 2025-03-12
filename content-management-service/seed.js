import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.draftDetails.deleteMany()
    await prisma.content.deleteMany()

    await prisma.content.create({
      data: {
        id: 106, 
        minterId: 1,
        fileSize: 1024,
        fileType: "image/png",
        contentUrl: "https://res.cloudinary.com/dfqxbwfnc/image/upload/v1678691499/Airneis-Project/Capture_d_e%CC%81cran_2023-03-13_a%CC%80_08.08.28_unayyq.png",
        contentHash: "unique-content-hash-123",
        status: "uploaded",
        uploadedAt: new Date(),
      },
    })

    await prisma.draftDetails.create({
      data: {
        contentId: 106,
        description: "Test Description",
        authorName: "Test Author",
        hashtag: ["#test"],
        location: "Test Location",
      },
    })
  } catch (e) {
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
