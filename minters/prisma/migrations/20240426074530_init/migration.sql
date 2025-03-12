-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "followerUserId" INTEGER NOT NULL,
    "followingUserId" INTEGER NOT NULL,
    "subscriptionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
