/*
  Warnings:

  - Made the column `email` on table `deliverymans` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "deliverymans" ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
