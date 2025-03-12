import { PrismaClient } from "@prisma/client"
import hashPassword from "../src/hashpassword.js"

const prisma = new PrismaClient()

async function main() {
  const [passwordHash, passwordSalt] = hashPassword("Admin@123456")
  await prisma.user.upsert({
    where: { email: "admin@admin.fr" },
    update: {},
    create: {
      email: "admin@admin.fr",
      username: "AdminTest",
      passwordHash,
      passwordSalt
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
