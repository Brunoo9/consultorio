/*
  Warnings:

  - Added the required column `confirm` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `confirm` TINYINT NOT NULL,
    ADD COLUMN `token` VARCHAR(150) NOT NULL;
