/*
  Warnings:

  - You are about to drop the column `clientEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientName` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Invoice_clientEmail_key";

-- DropIndex
DROP INDEX "Invoice_clientName_key";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "clientEmail",
DROP COLUMN "clientName",
ADD COLUMN     "clientId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "asset" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
