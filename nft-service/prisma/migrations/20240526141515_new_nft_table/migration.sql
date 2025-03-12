/*
  Warnings:

  - Made the column `contentId` on table `NFT` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contentUrl` on table `NFT` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `NFT` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NFT" ALTER COLUMN "contentId" SET NOT NULL,
ALTER COLUMN "contentUrl" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "NFT_userId_idx" ON "NFT"("userId");
