/*
  Warnings:

  - Added the required column `content_url` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "content_url" TEXT NOT NULL;
