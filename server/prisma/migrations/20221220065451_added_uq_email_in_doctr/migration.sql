/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `doctores` will be added. If there are existing duplicate values, this will fail.
  - Made the column `correo` on table `doctores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `doctores` MODIFY `correo` VARCHAR(45) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `correo_UNIQUE` ON `doctores`(`correo`);
