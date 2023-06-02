/*
  Warnings:

  - Changed the type of `price` on the `meals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "meals" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
