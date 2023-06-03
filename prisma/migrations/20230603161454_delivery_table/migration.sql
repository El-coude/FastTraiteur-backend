/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `deliverymans` table. All the data in the column will be lost.
  - Made the column `phone` on table `deliverymans` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "deliverymans" DROP CONSTRAINT "deliverymans_restaurantId_fkey";

-- AlterTable
ALTER TABLE "deliverymans" DROP COLUMN "restaurantId",
ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requestMessage" TEXT,
ADD COLUMN     "requestSent" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;
