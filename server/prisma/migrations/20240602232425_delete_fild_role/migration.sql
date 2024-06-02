/*
  Warnings:

  - You are about to drop the column `role` on the `Guardian` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Driver` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guardian" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT,
    "driverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Guardian_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guardian" ("cpf", "createdAt", "driverId", "email", "firstName", "id", "lastName", "password", "phone", "updatedAt") SELECT "cpf", "createdAt", "driverId", "email", "firstName", "id", "lastName", "password", "phone", "updatedAt" FROM "Guardian";
DROP TABLE "Guardian";
ALTER TABLE "new_Guardian" RENAME TO "Guardian";
CREATE UNIQUE INDEX "Guardian_cpf_key" ON "Guardian"("cpf");
CREATE UNIQUE INDEX "Guardian_email_key" ON "Guardian"("email");
CREATE UNIQUE INDEX "Guardian_phone_key" ON "Guardian"("phone");
CREATE TABLE "new_Driver" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Driver" ("cpf", "createdAt", "email", "firstName", "id", "lastName", "password", "phone", "updatedAt") SELECT "cpf", "createdAt", "email", "firstName", "id", "lastName", "password", "phone", "updatedAt" FROM "Driver";
DROP TABLE "Driver";
ALTER TABLE "new_Driver" RENAME TO "Driver";
CREATE UNIQUE INDEX "Driver_cpf_key" ON "Driver"("cpf");
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");
CREATE UNIQUE INDEX "Driver_phone_key" ON "Driver"("phone");
PRAGMA foreign_key_check("Guardian");
PRAGMA foreign_key_check("Driver");
PRAGMA foreign_keys=ON;
