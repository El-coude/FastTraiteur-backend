-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'admin';

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'client';

-- AlterTable
ALTER TABLE "deliverymans" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'deliveryman';

-- AlterTable
ALTER TABLE "managers" ADD COLUMN     "role" TEXT NOT NULL DEFAULT E'manager';
