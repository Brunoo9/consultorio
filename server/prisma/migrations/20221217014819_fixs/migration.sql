/*
  Warnings:

  - You are about to drop the column `tipodocumento` on the `pacientes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `tipodocumento`;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `tipodocumento`;
