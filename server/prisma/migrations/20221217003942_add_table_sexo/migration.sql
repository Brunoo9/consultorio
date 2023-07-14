/*
  Warnings:

  - You are about to drop the column `sexo` on the `pacientes` table. All the data in the column will be lost.
  - Added the required column `idsexo` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `sexo`,
    ADD COLUMN `eliminado` TINYINT NOT NULL DEFAULT 0,
    ADD COLUMN `idsexo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `eliminado` TINYINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `sexo` (
    `idsexo` INTEGER NOT NULL AUTO_INCREMENT,
    `sexo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idsexo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `sexo_idx` ON `pacientes`(`idsexo`);

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `sexo` FOREIGN KEY (`idsexo`) REFERENCES `sexo`(`idsexo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
