-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAID', 'DRAFT', 'SENT');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "invoiceTitle" TEXT NOT NULL,
    "invoiceAmount" INTEGER NOT NULL,
    "note" TEXT,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_userId_key" ON "Invoice"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_clientId_key" ON "Invoice"("id", "clientId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
