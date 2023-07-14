/*
  Warnings:

  - You are about to drop the `turnoxpaciente` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `paciente` to the `turnos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `turnoxpaciente` DROP FOREIGN KEY `paciente2`;

-- DropForeignKey
ALTER TABLE `turnoxpaciente` DROP FOREIGN KEY `turno`;

-- AlterTable
ALTER TABLE `turnos` ADD COLUMN `paciente` INTEGER NOT NULL;

-- DropTable
DROP TABLE `turnoxpaciente`;

-- CreateIndex
CREATE INDEX `paciente3_idx` ON `turnos`(`paciente`);

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `paciente3` FOREIGN KEY (`paciente`) REFERENCES `pacientes`(`idpaciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;
