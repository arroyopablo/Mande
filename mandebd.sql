CREATE TABLE Empleado(
    cc_empleado VARCHAR(20) NOT NULL,
    nombre_empleado VARCHAR(40) NOT NULL,
    apellido_empleado VARCHAR(40) NOT NULL,
	nacimiento_empleado DATE NOT NULL,
	direccion_empleado VARCHAR(60) NOT NULL,
    foto_empleado BYTEA NOT NULL,
    disponibilidad BOOLEAN NOT NULL DEFAULT 'false',
    password_empleado VARCHAR(80) NOT NULL,
	calificacion_empleado INT DEFAULT -1,
	CONSTRAINT pk_empleado PRIMARY KEY (cc_empleado)
);

CREATE TABLE Labor(
	id_labor INT NOT NULL,
	precio_hora	INT	NOT NULL,
	descripcion VARCHAR(50) NOT NULL,
	CONSTRAINT pk_labor PRIMARY KEY (id_labor)
);

CREATE TABLE Servicio(
    id_servicio INT NOT NULL,
	cc_empleado VARCHAR(20) NOT NULL,
	id_pagos INT NOT NULL,
	distacia INT NOT NULL,
	calificacion_servicio INT NOT NULL,
	CONSTRAINT pk_servicio PRIMARY KEY (id_servicio),
	CONSTRAINT fk_servicio FOREIGN KEY (cc_empleado)
	REFERENCES Empleado(cc_empleado)
);

CREATE TABLE Cliente(
	celular_cliente VARCHAR(20),
	nombre_cliente VARCHAR(30) NOT NULL,
	apellido_cliente VARCHAR(30) NOT NULL,
	direccion_cliente VARCHAR(60) NOT NULL,
	nacimiento_cliente DATE NOT NULL,
    latitud_cliente INT	NOT NULL,
	longitud_cliente INT NOT NULL,
	e_mail VARCHAR(50) NOT NULL,
	cc_cliente VARCHAR(20) NOT NULL,
	password_cliente VARCHAR(80) NOT NULL,			
	CONSTRAINT pk_cli PRIMARY KEY (celular_cliente)
);

CREATE TABLE emp_lab(
	cc_empleado VARCHAR(20),
	id_labor INT,
	CONSTRAINT emp_lab_fk1 FOREIGN KEY (cc_empleado)
	REFERENCES Empleado(cc_empleado),
	CONSTRAINT emp_lab_fk2 FOREIGN KEY (id_labor)
	REFERENCES Labor(id_labor)
);

CREATE TABLE ser_cli(
	celular_cliente VARCHAR(20),
	id_servicio INT,
	CONSTRAINT ser_cli_fk1 FOREIGN KEY (celular_cliente)
	REFERENCES Cliente(celular_cliente),
	CONSTRAINT ser_cli_fk2 FOREIGN KEY (id_servicio)
	REFERENCES Servicio(id_servicio)
);

CREATE TABLE pago(
    id_pagos INT NOT NULL,
    monto NUMERIC,
    fecha_pago DATE NOT NULL,
	id_serv INT REFERENCES Servicio(id_servicio)
);

INSERT INTO Cliente VALUES(
	'3014067147',
	'Pablo',
	'Arroyo',
	'Cra 11 # 12 Bis 22',
	'1998-03-21',
    107,
	35,
	'pablo.arroyo@orreounivalle.edu.co',
	'1059067268',
	'123'
);