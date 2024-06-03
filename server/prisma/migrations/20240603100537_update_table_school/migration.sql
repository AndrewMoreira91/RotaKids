/*
  Warnings:

  - A unique constraint covering the columns `[driverId]` on the table `Guardian` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[driverId]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guardian_driverId_key" ON "Guardian"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "School_driverId_key" ON "School"("driverId");
