/*
  Warnings:

  - Added the required column `idUser` to the `MinterProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MinterProfile" ADD COLUMN     "idUser" INTEGER NOT NULL;
