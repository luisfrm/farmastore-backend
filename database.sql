CREATE TABLE nivel (
  id INT PRIMARY KEY,
  cargo VARCHAR(20) NOT NULL
);
  
INSERT INTO nivel VALUES (1, 'Administrador'), (2, 'Gestor'), (3, 'Cliente');

CREATE TABLE usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user VARCHAR(15) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL,
  nombre VARCHAR(20) NOT NULL,
  apellido VARCHAR(20) NOT NULL,
  cedula VARCHAR(11) UNIQUE NOT NULL,
  telefono VARCHAR(12) NULL,
  direccion VARCHAR(50) NULL,
  correo VARCHAR(30) NULL
);

CREATE TABLE nivel_usuario(
  id INT PRIMARY KEY AUTO_INCREMENT,
  idUsuario INT UNIQUE,
  idNivel INT,
  CONSTRAINT fk_user FOREIGN KEY(idUsuario) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_nivel FOREIGN KEY(idNivel) REFERENCES nivel(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pago (
  id INT PRIMARY KEY AUTO_INCREMENT,
  monto DECIMAL(20,2) NOT NULL,
  fechaPago date NOT NULL,
  referencia VARCHAR(20)
);

CREATE TABLE pago_cliente (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fechaVencimiento DATE NOT NULL,
  idPago INT NOT NULL,
  idCliente INT NOT NULL,
  idMetodo INT NOT NULL,
  CONSTRAINT fk_Pago FOREIGN KEY(idPago) REFERENCES pago(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_Cli FOREIGN KEY(idCliente) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO usuario (user, pass, fecha, nombre, apellido, cedula, telefono, direccion, correo)
VALUES
(
  'admin',
  'admin',
  CURDATE(),
  "Luis",
  "Rivas",
   "28197626",
  "0412-4722407",
  "Veritas",
  "luis@321ignition.com"
);

INSERT INTO nivel_usuario(idUsuario, idNivel) VALUES(1, 1);

create table categoria (
id INT PRIMARY KEY AUTO_INCREMENT,
nombre VARCHAR(50) NOT NULL
);

create table producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  descripcion	VARCHAR(50) NOT NULL,
  precio decimal(18,2) NOT NULL,
  stock INT NOT NULL,
  idCategoria INT null,
  fechaVencimiento date NOT NULL,
  CONSTRAINT fkCat FOREIGN KEY(idCategoria) REFERENCES categoria(id) ON DELETE CASCADE ON UPDATE CASCADE 
);

create table venta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  idCliente INT NOT NULL,
  fecha date NOT NULL,
  CONSTRAINT fkCliente FOREIGN KEY (idCliente) REFERENCES usuario(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table detalle_venta (
  idDetalle INT PRIMARY KEY AUTO_INCREMENT,
  idVenta INT NOT NULL,
  idProducto INT NOT NULL,
  cantidad INT NOT NULL,
  CONSTRAINT fkVenta FOREIGN KEY(idVenta) REFERENCES venta(id),
  CONSTRAINT fkProducto FOREIGN KEY(idProducto) REFERENCES producto(id)
);