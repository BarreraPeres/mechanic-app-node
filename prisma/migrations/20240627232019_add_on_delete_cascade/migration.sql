-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_user_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_scheduling_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_vehicle_id_fkey";

-- DropForeignKey
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_user_Id_fkey";

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_scheduling_id_fkey" FOREIGN KEY ("scheduling_id") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
