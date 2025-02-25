/*
  Warnings:

  - The values [FINESHED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'SCHEDULED', 'FINISHED');
ALTER TABLE "order_services" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "schedules" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "schedules" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "order_services" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "order_services" ALTER COLUMN "status" SET DEFAULT 'PENDING';
ALTER TABLE "schedules" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
