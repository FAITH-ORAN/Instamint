-- AlterTable
ALTER TABLE "MinterProfile" ALTER COLUMN "picture" DROP NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "isEmailSearchEnabled" SET DEFAULT true,
ALTER COLUMN "isProfileVisible" SET DEFAULT true;
