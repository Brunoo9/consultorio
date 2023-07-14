/*
  Warnings:

  - You are about to drop the column `sexo` on the `doctores` table. All the data in the column will be lost.
  - Added the required column `idsexo` to the `doctores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctores` DROP COLUMN `sexo`,
    ADD COLUMN `idsexo` INTEGER NOT NULL,
    MODIFY `usuario` INTEGER NULL;

-- CreateIndex
CREATE INDEX `sexo2_idx` ON `doctores`(`idsexo`);

-- AddForeignKey
ALTER TABLE `doctores` ADD CONSTRAINT `sexo2` FOREIGN KEY (`idsexo`) REFERENCES `sexo`(`idsexo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
