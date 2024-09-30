-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mechanic_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_mechanic_id_fkey" FOREIGN KEY ("mechanic_id") REFERENCES "mechanics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
