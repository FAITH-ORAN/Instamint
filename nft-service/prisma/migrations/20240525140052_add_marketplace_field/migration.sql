/*
  Warnings:

  - Added the required column `marketplace` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "marketplace" TEXT NOT NULL;
