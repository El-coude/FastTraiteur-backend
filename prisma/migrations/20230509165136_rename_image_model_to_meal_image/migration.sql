/*
  Warnings:

  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "images";

-- CreateTable
CREATE TABLE "mealimages" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mealId" INTEGER NOT NULL,

    CONSTRAINT "mealimages_pkey" PRIMARY KEY ("id")
);
