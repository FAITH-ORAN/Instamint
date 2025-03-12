/*
  Warnings:

  - You are about to drop the column `followerUserId` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `followingUserId` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `followerMinterId` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingMinterId` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "followerUserId",
DROP COLUMN "followingUserId",
ADD COLUMN     "followerMinterId" INTEGER NOT NULL,
ADD COLUMN     "followingMinterId" INTEGER NOT NULL,
ADD COLUMN     "minterProfileId" INTEGER;

-- CreateTable
CREATE TABLE "MinterProfile" (
    "id" SERIAL NOT NULL,
    "picture" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "isEmailSearchEnabled" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,
    "isProfileVisible" BOOLEAN NOT NULL,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MinterProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_followerMinterId_fkey" FOREIGN KEY ("followerMinterId") REFERENCES "MinterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_followingMinterId_fkey" FOREIGN KEY ("followingMinterId") REFERENCES "MinterProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_minterProfileId_fkey" FOREIGN KEY ("minterProfileId") REFERENCES "MinterProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
