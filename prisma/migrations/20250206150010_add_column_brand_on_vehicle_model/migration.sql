/*
  Warnings:

  - Added the required column `brand` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "brand" TEXT NOT NULL;
