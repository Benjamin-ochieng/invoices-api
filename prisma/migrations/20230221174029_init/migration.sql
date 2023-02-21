-- CreateEnum
CREATE TYPE "INVOICE_STATUS" AS ENUM ('Draft', 'Sent', 'Paid', 'Late');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "total" INTEGER NOT NULL,
    "status" "INVOICE_STATUS" NOT NULL DEFAULT 'Draft',

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientName_key" ON "Invoice"("clientName");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_clientEmail_key" ON "Invoice"("clientEmail");
