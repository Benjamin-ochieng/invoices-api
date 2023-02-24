/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Client_id_userId_key" ON "Client"("id", "userId");
