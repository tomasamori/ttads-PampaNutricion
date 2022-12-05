export interface Producto {
  marca: string,
  nombre: string,
  descripcion: string,
  peso: string,
  imgUrl: string,
  tipoMascota: {tipoMascota: string},
  precio: {precio: number}
}
