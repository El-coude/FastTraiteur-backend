/*
  Warnings:

  - You are about to drop the column `orderItemId` on the `meals` table. All the data in the column will be lost.
  - Added the required column `mealId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_orderItemId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "mealId" INTEGER NOT NULL,
ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "orderItemId";

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
