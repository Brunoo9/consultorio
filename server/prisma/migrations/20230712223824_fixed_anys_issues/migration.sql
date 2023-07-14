/*
  Warnings:

  - You are about to drop the column `historiaclinica` on the `detalle_historia` table. All the data in the column will be lost.
  - You are about to drop the column `tiposangre` on the `pacientes` table. All the data in the column will be lost.
  - You are about to drop the `historias_clinicas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `historiaxpaciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalle_historia` DROP FOREIGN KEY `historia2`;

-- DropForeignKey
ALTER TABLE `historiaxpaciente` DROP FOREIGN KEY `historia`;

-- DropForeignKey
ALTER TABLE `historiaxpaciente` DROP FOREIGN KEY `paciente`;

-- DropForeignKey
ALTER TABLE `pacientes` DROP FOREIGN KEY `sangre`;

-- DropIndex
DROP INDEX `historia_idx` ON `detalle_historia`;

-- AlterTable
ALTER TABLE `detalle_historia` DROP COLUMN `historiaclinica`;

-- AlterTable
ALTER TABLE `pacientes` DROP COLUMN `tiposangre`;

-- DropTable
DROP TABLE `historias_clinicas`;

-- DropTable
DROP TABLE `historiaxpaciente`;

-- CreateTable
CREATE TABLE `historia_clinica` (
    `idhistoriaclinica` INTEGER NOT NULL AUTO_INCREMENT,
    `alergias` VARCHAR(45) NULL,
    `observaciones` LONGTEXT NULL,
    `idpaciente` INTEGER NOT NULL,
    `idtiposangre` INTEGER NOT NULL,

    INDEX `idpaciente_idx`(`idpaciente`),
    INDEX `idtiposangre_idx`(`idtiposangre`),
    PRIMARY KEY (`idhistoriaclinica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalle_historia` ADD CONSTRAINT `historia2` FOREIGN KEY (`idhistoriaclinica`) REFERENCES `historia_clinica`(`idhistoriaclinica`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historia_clinica` ADD CONSTRAINT `idpaciente` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes`(`idpaciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historia_clinica` ADD CONSTRAINT `idtiposangre` FOREIGN KEY (`idtiposangre`) REFERENCES `tipos_de_sangre`(`idtipodesangre`) ON DELETE NO ACTION ON UPDATE NO ACTION;
