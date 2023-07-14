/*
  Warnings:

  - You are about to drop the `especialidadxdoctor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idespecialidad` to the `doctores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `especialidadxdoctor` DROP FOREIGN KEY `doctor2`;

-- DropForeignKey
ALTER TABLE `especialidadxdoctor` DROP FOREIGN KEY `especialidad`;

-- AlterTable
ALTER TABLE `doctores` ADD COLUMN `idespecialidad` INTEGER NOT NULL;

-- DropTable
DROP TABLE `especialidadxdoctor`;

-- CreateIndex
CREATE INDEX `especialidad_idx` ON `doctores`(`idespecialidad`);

-- AddForeignKey
ALTER TABLE `doctores` ADD CONSTRAINT `especialidad` FOREIGN KEY (`idespecialidad`) REFERENCES `especialidades`(`idespecialidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;
