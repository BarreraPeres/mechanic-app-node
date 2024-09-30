-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_mechanic_id_fkey";

-- CreateTable
CREATE TABLE "_MechanicToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MechanicToUser_AB_unique" ON "_MechanicToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MechanicToUser_B_index" ON "_MechanicToUser"("B");

-- AddForeignKey
ALTER TABLE "_MechanicToUser" ADD CONSTRAINT "_MechanicToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "mechanics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MechanicToUser" ADD CONSTRAINT "_MechanicToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
