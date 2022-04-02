# ttads-PampaNutricion

## 1 - Enunciado general

Pampa Nutrición es una empresa de la ciudad Villa Ramallo que se dedica al comercio y distribución de alimentos para mascotas de forma mayorista a los pueblos cercanos a la localidad, como La Violeta, San Pedro, Ramallo, San Nicolás, entre otros.

Hoy en día es de las cadenas mayoristas más importantes del país, con más de 10 años en el mercado, especializada en la comercialización de productos y servicios para mascotas. Brinda una experiencia diferente de compra, ofreciendo productos y servicios de alta calidad que cumplen con las necesidades de las mascotas y la satisfacción de sus dueños.

Actualmente, podés visitar cualquiera de sus 5 sucursales distribuidas a lo largo del país, las cuales cuentan con modernas y cómodas instalaciones o realizar cualquier tipo de compra desde la comodidad de tu casa.

Pampa Nutrición es una empresa que si bien tiene sus fortalezas, está teniendo muchos problemas en cuanto a la comunicación con sus clientes y, por ende, vamos a dedicarnos a crear un sitio web para que esta empresa pueda comercializar sus productos de una manera más óptima y sencilla para el cliente.

## 2 - ABMC

### 2.1 - ABMC Simples

#### 2.1.1 - ABMC Usuarios

##### Atributos:

- idUsuario
- usuario
- contraseña
- cuil/cuit
- email
- fechaNacimiento
- direccion
- telefono

#### 2.1.2 - ABMC Proveedores

##### Atributos:

- idProveedor
- cuil/cuit
- razonSocial
- email
- telefono

#### 2.1.3 - ABMC Sucursales

##### Atributos:

- idSucursal
- nombre
- direccion

#### 2.1.4 - ABMC Tipos de Mascotas

##### Atributos:

- idTipoMascota
- nombre
- tamañoRaza (null)
- edad

### 2.2 - ABMC Dependientes

#### 2.2.1 - ABMC Productos

Dependerá del Tipo de Mascota

##### Atributos:

- idProducto
- marca
- nombre
- descripcion
- peso

#### 2.2.2 - ABMC Clientes/Empleados

Dependerán del Usuario

##### Atributos Clientes:

- razonSocial

##### Atributos Empleados:

- legajo
- nombre
- apellido

## 3 - Listado

### 3.1 - Listado simple

#### Productos

Listado que mostrara todos los productos disponibles a la venta

### 3.2 - Listados complejos

#### Clientes con histórico de Pedidos

Listado que mostrará todos los clientes con su respectivo histórico de pedidos.

#### Tipos de Mascota con Productos

Listado que mostrará todos los tipos de mascotas con sus respectivos productos.

## 4 - Detalles

### 4.1 - Productos con detalle

Se muestran todos los productos y al solicitar más información se muestra el detalle.

### 4.2 - Pedidos con detalle de cliente

Se muestran todos los pedidos y al solicitar más información se muestra el cliente que lo solicitó junto su respectiva información.

## Miembros del equipo

- 46846 - Amori, Tomás
- 46819 - Mayor, Matías
- 47241 - Tomás, Alexis
- 46818 - Vazquez, Juan Cruz

## Modelo de datos

![md-PampaNutricion](https://user-images.githubusercontent.com/80716821/161186016-1a02b8fb-7cfb-4dea-89b5-93a858cbdc48.jpg)
