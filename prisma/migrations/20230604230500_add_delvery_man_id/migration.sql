/*
  Warnings:

  - The values [DELIVERED,FINISHED] on the enum `ORDERSTATE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ORDERSTATE_new" AS ENUM ('PENDING', 'COOKING', 'DELIVERY', 'DONE', 'CANCELED');
ALTER TABLE "orders" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "state" TYPE "ORDERSTATE_new" USING ("state"::text::"ORDERSTATE_new");
ALTER TYPE "ORDERSTATE" RENAME TO "ORDERSTATE_old";
ALTER TYPE "ORDERSTATE_new" RENAME TO "ORDERSTATE";
DROP TYPE "ORDERSTATE_old";
ALTER TABLE "orders" ALTER COLUMN "state" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliverymanId" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliverymanId_fkey" FOREIGN KEY ("deliverymanId") REFERENCES "deliverymans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
