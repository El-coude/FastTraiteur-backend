/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `meals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
