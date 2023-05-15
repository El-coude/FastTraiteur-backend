/*
  Warnings:

  - You are about to drop the column `city` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `deliverymans` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `deliverymans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "city",
ADD COLUMN     "latitud" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longtitud" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "city",
ADD COLUMN     "latitud" DOUBLE PRECISION,
ADD COLUMN     "longtitud" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "deliverymans" ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "deliverymans_restaurantId_key" ON "deliverymans"("restaurantId");

-- AddForeignKey
ALTER TABLE "deliverymans" ADD CONSTRAINT "deliverymans_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
