/*
  Warnings:

  - A unique constraint covering the columns `[password]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "password" TEXT,
ALTER COLUMN "clientName" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_password_key" ON "Client"("password");
