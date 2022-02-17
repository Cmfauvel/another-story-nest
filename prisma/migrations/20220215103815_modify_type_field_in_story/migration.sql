/*
  Warnings:

  - You are about to drop the column `typeName` on the `Story` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Story" DROP CONSTRAINT "Story_typeName_fkey";

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "typeName",
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Story" ADD FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE CASCADE ON UPDATE CASCADE;
