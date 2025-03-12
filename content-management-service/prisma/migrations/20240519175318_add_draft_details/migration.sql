-- CreateTable
CREATE TABLE "DraftDetails" (
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "hashtag" TEXT[],
    "location" TEXT,

    CONSTRAINT "DraftDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftDetails_contentId_key" ON "DraftDetails"("contentId");

-- AddForeignKey
ALTER TABLE "DraftDetails" ADD CONSTRAINT "DraftDetails_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
