/*
  Warnings:

  - You are about to drop the column `doctor3` on the `turnos` table. All the data in the column will be lost.
  - You are about to drop the column `fechaturno` on the `turnos` table. All the data in the column will be lost.
  - You are about to drop the column `horaturno` on the `turnos` table. All the data in the column will be lost.
  - Added the required column `doctor` to the `turnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnEnd` to the `turnos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnStart` to the `turnos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `turnos` DROP FOREIGN KEY `doctor3`;

-- AlterTable
ALTER TABLE `turnos` DROP COLUMN `doctor3`,
    DROP COLUMN `fechaturno`,
    DROP COLUMN `horaturno`,
    ADD COLUMN `doctor` INTEGER NOT NULL,
    ADD COLUMN `turnEnd` DATETIME(0) NOT NULL,
    ADD COLUMN `turnStart` DATETIME(0) NOT NULL;

-- CreateIndex
CREATE INDEX `doctor3_idx` ON `turnos`(`doctor`);

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `doctor3` FOREIGN KEY (`doctor`) REFERENCES `doctores`(`iddoctor`) ON DELETE NO ACTION ON UPDATE NO ACTION;
