/*
  Warnings:

  - Made the column `customerName` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `currency` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `convertedAmount` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salesRep` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "customerName" SET NOT NULL,
ALTER COLUMN "currency" SET NOT NULL,
ALTER COLUMN "convertedAmount" SET NOT NULL,
ALTER COLUMN "convertedAmount" SET DEFAULT 0,
ALTER COLUMN "salesRep" SET NOT NULL;
