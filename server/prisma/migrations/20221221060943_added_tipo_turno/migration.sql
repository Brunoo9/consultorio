/*
  Warnings:

  - Added the required column `idtipoturno` to the `turnos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turnos` ADD COLUMN `idtipoturno` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tipoturno` (
    `idtipoturno` INTEGER NOT NULL AUTO_INCREMENT,
    `tituloturno` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idtipoturno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `tipoturno_idx` ON `turnos`(`idtipoturno`);

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `tipoturno` FOREIGN KEY (`idtipoturno`) REFERENCES `tipoturno`(`idtipoturno`) ON DELETE NO ACTION ON UPDATE NO ACTION;
