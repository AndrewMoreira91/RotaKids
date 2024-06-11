/*
  Warnings:

  - Added the required column `name` to the `Halt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Halt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "schoolId" TEXT,
    "childId" TEXT,
    "name" TEXT NOT NULL,
    "routeId" INTEGER NOT NULL,
    CONSTRAINT "Halt_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Halt" ("address", "id", "latitude", "longitude", "order", "routeId", "type") SELECT "address", "id", "latitude", "longitude", "order", "routeId", "type" FROM "Halt";
DROP TABLE "Halt";
ALTER TABLE "new_Halt" RENAME TO "Halt";
PRAGMA foreign_key_check("Halt");
PRAGMA foreign_keys=ON;
