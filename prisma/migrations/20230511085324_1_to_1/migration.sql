/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `managers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[managerId]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "managerId" INTEGER;

-- AlterTable
ALTER TABLE "managers" DROP COLUMN "restaurantId";

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_managerId_key" ON "Restaurant"("managerId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "managers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
