-- CreateTable
CREATE TABLE "NFTMarket" (
    "id" SERIAL NOT NULL,
    "nftId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "buyerId" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'listed',
    "price" DOUBLE PRECISION NOT NULL,
    "marketplaceName" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFTMarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "NFTMarketId" INTEGER NOT NULL,
    "proposedById" INTEGER NOT NULL,
    "proposedToId" INTEGER NOT NULL,
    "nftOfferedId" INTEGER NOT NULL,
    "nftRequestedId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFTMarket_nftId_key" ON "NFTMarket"("nftId");

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_NFTMarketId_fkey" FOREIGN KEY ("NFTMarketId") REFERENCES "NFTMarket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
