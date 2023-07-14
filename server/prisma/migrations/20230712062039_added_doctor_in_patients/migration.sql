/*
  Warnings:

  - Added the required column `iddoctor` to the `pacientes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pacientes` ADD COLUMN `iddoctor` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `iddoc_idx` ON `pacientes`(`iddoctor`);

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `iddoc` FOREIGN KEY (`iddoctor`) REFERENCES `doctores`(`iddoctor`) ON DELETE NO ACTION ON UPDATE NO ACTION;
