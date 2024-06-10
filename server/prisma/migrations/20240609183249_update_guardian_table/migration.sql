/*
  Warnings:

  - Made the column `address` on table `Child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `driverId` on table `Child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Child` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Child` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Guardian_driverId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Child" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "schoolId" TEXT NOT NULL,
    "guardianId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Child_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Child_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Child_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Child" ("address", "birthDate", "createdAt", "driverId", "guardianId", "id", "latitude", "longitude", "name", "schoolId", "updatedAt") SELECT "address", "birthDate", "createdAt", "driverId", "guardianId", "id", "latitude", "longitude", "name", "schoolId", "updatedAt" FROM "Child";
DROP TABLE "Child";
ALTER TABLE "new_Child" RENAME TO "Child";
PRAGMA foreign_key_check("Child");
PRAGMA foreign_keys=ON;
