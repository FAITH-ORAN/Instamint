-- Add new columns with default values
ALTER TABLE "NFT" ADD COLUMN "contentId" INTEGER DEFAULT 0;
ALTER TABLE "NFT" ADD COLUMN "contentUrl" TEXT DEFAULT '';
ALTER TABLE "NFT" ADD COLUMN "userId" INTEGER DEFAULT 0;

-- Drop old columns
ALTER TABLE "NFT" DROP COLUMN "content_id";
ALTER TABLE "NFT" DROP COLUMN "content_url";
ALTER TABLE "NFT" DROP COLUMN "user_id";

-- Rename the new columns to the desired names
ALTER TABLE "NFT" ALTER COLUMN "contentId" DROP DEFAULT;
ALTER TABLE "NFT" ALTER COLUMN "contentUrl" DROP DEFAULT;
ALTER TABLE "NFT" ALTER COLUMN "userId" DROP DEFAULT;
