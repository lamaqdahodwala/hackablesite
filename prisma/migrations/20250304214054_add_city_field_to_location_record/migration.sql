/*
  Warnings:

  - Added the required column `city` to the `BankLocation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankLocation" ADD COLUMN     "city" TEXT NOT NULL;
