-- CreateTable
CREATE TABLE "BankLocation" (
    "id" SERIAL NOT NULL,
    "telephoneNumber" INTEGER NOT NULL,
    "branchName" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "BankLocation_pkey" PRIMARY KEY ("id")
);
