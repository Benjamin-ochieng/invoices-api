/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[issuer]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issuer` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastLoginAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "userName",
ADD COLUMN     "issuer" TEXT NOT NULL,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_issuer_key" ON "User"("issuer");
