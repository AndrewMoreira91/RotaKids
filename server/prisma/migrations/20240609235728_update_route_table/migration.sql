/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Route` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "daysOfTheWeek" TEXT,
    "startTime" DATETIME,
    "endTime" DATETIME
);
INSERT INTO "new_Route" ("daysOfTheWeek", "endTime", "id", "name", "startTime") SELECT "daysOfTheWeek", "endTime", "id", "name", "startTime" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
PRAGMA foreign_key_check("Route");
PRAGMA foreign_keys=ON;
