CREATE TABLE `pais` (
  `idpais` int auto_increment,
  `nompais` varchar(100),
  KEY `PRIMARY key` (`idpais`)
);

CREATE TABLE `level_usuarios` (
  `idlevel` int auto_increment,
  `desc_level` varchar(15),
  KEY `PRIMARY key` (`idlevel`)
);

CREATE TABLE `articulos` (
  `idart` int auto_increment,
  `descart` varchar(150),
  `prec_compra` float,
  `prec_venta` float,
  KEY `PRIMARY key` (`idart`)
);

CREATE TABLE `tipo_documento` (
  `idtip_doc` int auto_increment,
  `desc_doc` varchar(20),
  KEY `PRIMARY key` (`idtip_doc`)
);

CREATE TABLE `documento` (
  `id_doc` int auto_increment,
  `id_tip_doc` int,
  `desc_doc` varchar(20),
  FOREIGN KEY (`id_tip_doc`) REFERENCES `tipo_documento`(`idtip_doc`),
  KEY `PRIMARY key` (`id_doc`)
);

CREATE TABLE `region` (
  `idreg` int auto_increment,
  `nomreg` varchar(100),
  `idpais` int,
  FOREIGN KEY (`idpais`) REFERENCES `pais`(`idpais`),
  KEY `PRIMARY key` (`idreg`)
);

CREATE TABLE `provincia` (
  `idprov` int auto_increment,
  `nomprov` varchar(100),
  `idreg` int,
  FOREIGN KEY (`idreg`) REFERENCES `region`(`idreg`),
  KEY `PRIMARY key` (`idprov`)
);

CREATE TABLE `ciudad` (
  `idciudad` int auto_increment,
  `nomciudad` varchar(100),
  `idprov` int,
  FOREIGN KEY (`idprov`) REFERENCES `provincia`(`idprov`),
  KEY `PRIMARY key` (`idciudad`)
);

CREATE TABLE `sector` (
  `idsector` int auto_increment,
  `nomsector` varchar(100),
  `idciudad` int,
  FOREIGN KEY (`idciudad`) REFERENCES `ciudad`(`idciudad`),
  KEY `PRIMARY key` (`idsector`)
);

CREATE TABLE `direccion` (
  `iddireccion` int auto_increment,
  `nomdireccion` varchar(100),
  `idsector` int,
  FOREIGN KEY (`idsector`) REFERENCES `sector`(`idsector`),
  KEY `PRIMARY key` (`iddireccion`)
);

CREATE TABLE `personas` (
  `idpersona` int auto_increment,
  `nom_persona` varchar(50),
  `ape_persona` varchar(50),
  `iddireccion` int,
  `telefono` int,
  `genero` char(1),
  `id_doc` int,
  FOREIGN KEY (`id_doc`) REFERENCES `documento`(`id_doc`),
  FOREIGN KEY (`iddireccion`) REFERENCES `direccion`(`iddireccion`),
  KEY `PRIMARY key` (`idpersona`)
);

CREATE TABLE `empleados` (
  `idemp` int auto_increment,
  `idpersona` int,
  `cargo` varchar(50),
  FOREIGN KEY (`idpersona`) REFERENCES `personas`(`idpersona`),
  KEY `PRIMARY key` (`idemp`)
);

CREATE TABLE `usuarios` (
  `iduser` int auto_increment,
  `user` varchar(15),
  `password` varchar(20),
  `idemp` int,
  `id_level` int,
  FOREIGN KEY (`idemp`) REFERENCES `empleados`(`idemp`),
  FOREIGN KEY (`id_level`) REFERENCES `level_usuarios`(`idlevel`),
  KEY `PRIMARY key` (`iduser`)
);

CREATE TABLE `compras` (
  `idcompras` int auto_increment,
  `fecha_compras` date,
  `id_cli` date,
  `iduser` int,
  `total` float,
  FOREIGN KEY (`iduser`) REFERENCES `usuarios`(`iduser`),
  KEY `PRIMARY key` (`idcompras`)
);

CREATE TABLE `det_compras` (
  `idcompras` int,
  `idart` int,
  `cantidad` float,
  `prec_compras` float,
  `importe` float,
  FOREIGN KEY (`idart`) REFERENCES `articulos`(`idart`),
  FOREIGN KEY (`idcompras`) REFERENCES `compras`(`idcompras`)
);

CREATE TABLE `status_ventas` (
  `idstatus` int auto_increment,
  `desc_status` varchar(15),
  KEY `PRIMARY key` (`idstatus`)
);

CREATE TABLE `ventas` (
  `idventas` int auto_increment,
  `fecha_ventas` date,
  `id_cli` date,
  `iduser` int,
  `total` float,
  `idstatus` int,
  FOREIGN KEY (`iduser`) REFERENCES `usuarios`(`iduser`),
  FOREIGN KEY (`idstatus`) REFERENCES `status_ventas`(`idstatus`),
  KEY `PRIMARY key` (`idventas`)
);


CREATE TABLE `det_ventas` (
  `idventas` int,
  `idart` int,
  `cantidad` float,
  `prec_ventas` float,
  `importe` float,
  FOREIGN KEY (`idventas`) REFERENCES `ventas`(`idventas`),
  FOREIGN KEY (`idart`) REFERENCES `articulos`(`idart`)
);

CREATE TABLE `temp_det_ventas` (
  `idventas` int,
  `idart` int,
  `cantidad` float,
  `prec_ventas` float,
  `importe` float,
  FOREIGN KEY (`idventas`) REFERENCES `ventas`(`idventas`),
  FOREIGN KEY (`idart`) REFERENCES `articulos`(`idart`)
);

CREATE TABLE `almacen` (
  `idalm` int auto_increment,
  `nom_alm` varchar(150),
  `id_direccion` int,
  FOREIGN KEY (`id_direccion`) REFERENCES `direccion`(`iddireccion`),
  KEY `PRIMARY key` (`idalm`)
);

CREATE TABLE `stock` (
  `idart` int,
  `stock` int,
  `punto_reorden` int,
  `id_alm` int,
  FOREIGN KEY (`idart`) REFERENCES `articulos`(`idart`),
  FOREIGN KEY (`id_alm`) REFERENCES `almacen`(`idalm`)
);

CREATE TABLE `proveedor` (
  `idprov` int auto_increment,
  `idpersona` int,
  FOREIGN KEY (`idpersona`) REFERENCES `personas`(`idpersona`),
  KEY `PRIMARY key` (`idprov`)
);

CREATE TABLE `clientes` (
  `idcli` int auto_increment,
  `idpersona` int,
  FOREIGN KEY (`idpersona`) REFERENCES `personas`(`idpersona`),
  KEY `PRIMARY key` (`idcli`)
);

CREATE TABLE `status` (
  `idstatus` int auto_increment,
  `descstatus` varchar(20),
  KEY `PRIMARY key` (`idstatus`)
);

CREATE TABLE `pedidos_clientes` (
  `idped_cli` int auto_increment,
  `idstatus` int,
  `idcli` int,
  FOREIGN KEY (`idcli`) REFERENCES `empleados`(`idemp`),
  FOREIGN KEY (`idstatus`) REFERENCES `status`(`idstatus`),
  KEY `PRIMARY key` (`idped_cli`)
);

CREATE TABLE `detalles_pedidos_clientes` (
  `idped_cli` int,
  `idart` int,
  `cant` int,
  `precio_art` float,
  `envio` float,
  `importe` float,
  FOREIGN KEY (`idart`) REFERENCES `articulos`(`idart`),
  FOREIGN KEY (`idped_cli`) REFERENCES `pedidos_clientes`(`idped_cli`)
);
