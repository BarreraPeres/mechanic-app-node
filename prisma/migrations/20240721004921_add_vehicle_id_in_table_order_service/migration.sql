/*
  Warnings:

  - Added the required column `vehicle_id` to the `order_services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_services" ADD COLUMN     "vehicle_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_services" ADD CONSTRAINT "order_services_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
