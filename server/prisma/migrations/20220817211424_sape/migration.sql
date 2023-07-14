-- CreateTable
CREATE TABLE `detalle_historia` (
    `iddetalle_historia` INTEGER NOT NULL AUTO_INCREMENT,
    `motivo` VARCHAR(45) NOT NULL,
    `tratamiento` VARCHAR(45) NULL,
    `fecha` DATE NOT NULL,
    `idhistoriaclinica` INTEGER NOT NULL,
    `historiaclinica` INTEGER NOT NULL,

    INDEX `historia2_idx`(`idhistoriaclinica`),
    INDEX `historia_idx`(`historiaclinica`),
    PRIMARY KEY (`iddetalle_historia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctores` (
    `iddoctor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombresdoctor` VARCHAR(45) NOT NULL,
    `apellidodoctor` VARCHAR(45) NOT NULL,
    `sexo` VARCHAR(45) NOT NULL,
    `fechanacimiento` DATE NOT NULL,
    `correo` VARCHAR(45) NULL,
    `telefono` VARCHAR(45) NULL,
    `codigopostal` VARCHAR(45) NULL,
    `direccion` VARCHAR(45) NULL,
    `usuario` INTEGER NOT NULL,

    INDEX `usuario_idx`(`usuario`),
    PRIMARY KEY (`iddoctor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especialidades` (
    `idespecialidad` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreespecialidad` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idespecialidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `especialidadxdoctor` (
    `idespecialidad` INTEGER NOT NULL,
    `iddoctor` INTEGER NOT NULL,

    INDEX `doctor2_idx`(`iddoctor`),
    PRIMARY KEY (`idespecialidad`, `iddoctor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historias_clinicas` (
    `idhistoriaclinica` INTEGER NOT NULL AUTO_INCREMENT,
    `alergias` VARCHAR(45) NULL,
    `observaciones` LONGTEXT NOT NULL,

    PRIMARY KEY (`idhistoriaclinica`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historiaxpaciente` (
    `idhistoria` INTEGER NOT NULL,
    `idpaciente` INTEGER NOT NULL,

    INDEX `paciente_idx`(`idpaciente`),
    PRIMARY KEY (`idhistoria`, `idpaciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `localidades` (
    `idlocalidad` INTEGER NOT NULL,
    `nombrelocalidad` VARCHAR(45) NOT NULL,
    `idprovincia` INTEGER NOT NULL,

    INDEX `provincia_idx`(`idprovincia`),
    PRIMARY KEY (`idlocalidad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `obras_sociales` (
    `idobrasocial` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreobrasocial` VARCHAR(45) NOT NULL,
    `numobrasocial` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idobrasocial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `idpaciente` INTEGER NOT NULL AUTO_INCREMENT,
    `nrodocumento` VARCHAR(45) NOT NULL,
    `tipodocumento` INTEGER NOT NULL,
    `nombrespaciente` VARCHAR(45) NOT NULL,
    `apellidopaciente` VARCHAR(45) NOT NULL,
    `sexo` VARCHAR(45) NOT NULL,
    `tiposangre` INTEGER NOT NULL,
    `fechanacimiento` DATE NOT NULL,
    `correo` VARCHAR(45) NULL,
    `telefono` VARCHAR(45) NULL,
    `telefonoresponsable` VARCHAR(45) NULL,
    `codigopostal` VARCHAR(45) NULL,
    `direccion` VARCHAR(45) NULL,
    `provincia` INTEGER NOT NULL,
    `localidad` INTEGER NOT NULL,
    `obrasocial` INTEGER NOT NULL,

    UNIQUE INDEX `nrodocumento_UNIQUE`(`nrodocumento`),
    INDEX `localidad_idx`(`localidad`),
    INDEX `obrasocial_idx`(`obrasocial`),
    INDEX `provincia2_idx`(`provincia`),
    INDEX `sangre_idx`(`tiposangre`),
    INDEX `tipodocumento_idx`(`tipodocumento`),
    PRIMARY KEY (`idpaciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincias` (
    `idprovincia` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreprovincia` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idprovincia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `idrol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombrerol` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idrol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_de_sangre` (
    `idtipodesangre` INTEGER NOT NULL AUTO_INCREMENT,
    `tipodesangre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idtipodesangre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipos_documentos` (
    `idtipo` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`idtipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turnos` (
    `idturno` INTEGER NOT NULL AUTO_INCREMENT,
    `observaciones` LONGTEXT NULL,
    `fechaturno` DATE NOT NULL,
    `horaturno` TIME(0) NOT NULL,
    `doctor3` INTEGER NOT NULL,

    INDEX `doctor3_idx`(`doctor3`),
    PRIMARY KEY (`idturno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turnoxpaciente` (
    `idturno` INTEGER NOT NULL,
    `idpaciente` INTEGER NOT NULL,

    INDEX `paciente_idx`(`idpaciente`),
    PRIMARY KEY (`idturno`, `idpaciente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `idusuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreusuario` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `rol` INTEGER NOT NULL,

    UNIQUE INDEX `nombreusuario_UNIQUE`(`nombreusuario`),
    INDEX `rol_idx`(`rol`),
    PRIMARY KEY (`idusuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalle_historia` ADD CONSTRAINT `historia2` FOREIGN KEY (`idhistoriaclinica`) REFERENCES `historias_clinicas`(`idhistoriaclinica`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `doctores` ADD CONSTRAINT `usuario` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`idusuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `especialidadxdoctor` ADD CONSTRAINT `doctor2` FOREIGN KEY (`iddoctor`) REFERENCES `doctores`(`iddoctor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `especialidadxdoctor` ADD CONSTRAINT `especialidad` FOREIGN KEY (`idespecialidad`) REFERENCES `especialidades`(`idespecialidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historiaxpaciente` ADD CONSTRAINT `historia` FOREIGN KEY (`idhistoria`) REFERENCES `historias_clinicas`(`idhistoriaclinica`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `historiaxpaciente` ADD CONSTRAINT `paciente` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes`(`idpaciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `localidades` ADD CONSTRAINT `provincia` FOREIGN KEY (`idprovincia`) REFERENCES `provincias`(`idprovincia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `localidad` FOREIGN KEY (`localidad`) REFERENCES `localidades`(`idlocalidad`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `obrasocial` FOREIGN KEY (`obrasocial`) REFERENCES `obras_sociales`(`idobrasocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `provincia2` FOREIGN KEY (`provincia`) REFERENCES `provincias`(`idprovincia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `sangre` FOREIGN KEY (`tiposangre`) REFERENCES `tipos_de_sangre`(`idtipodesangre`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `tipodocumento` FOREIGN KEY (`tipodocumento`) REFERENCES `tipos_documentos`(`idtipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `turnos` ADD CONSTRAINT `doctor3` FOREIGN KEY (`doctor3`) REFERENCES `doctores`(`iddoctor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `turnoxpaciente` ADD CONSTRAINT `paciente2` FOREIGN KEY (`idpaciente`) REFERENCES `pacientes`(`idpaciente`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `turnoxpaciente` ADD CONSTRAINT `turno` FOREIGN KEY (`idturno`) REFERENCES `turnos`(`idturno`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `rol` FOREIGN KEY (`rol`) REFERENCES `roles`(`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION;
