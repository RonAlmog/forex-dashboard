/*
  Warnings:

  - You are about to drop the column `region` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `salesRep` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `regionId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesRepId` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "region",
DROP COLUMN "salesRep",
ADD COLUMN     "regionId" TEXT NOT NULL,
ADD COLUMN     "salesRepId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_salesRepId_fkey" FOREIGN KEY ("salesRepId") REFERENCES "salesreps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
