/*
  Warnings:

  - You are about to drop the column `password` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientEmail]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_password_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "password",
ALTER COLUMN "clientEmail" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_clientEmail_key" ON "Client"("clientEmail");
