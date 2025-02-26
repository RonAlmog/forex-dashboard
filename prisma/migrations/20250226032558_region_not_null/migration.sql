/*
  Warnings:

  - Made the column `name` on table `regions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `salesreps` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "regions" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "salesreps" ALTER COLUMN "name" SET NOT NULL;
