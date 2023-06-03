-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_orderItemId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "clientId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "meals" ALTER COLUMN "orderItemId" DROP NOT NULL,
ALTER COLUMN "orderItemId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
