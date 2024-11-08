-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "client_id_key" ON "client"("id");
