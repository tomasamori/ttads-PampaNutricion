export interface Producto {
  _id?: any,
  marca: string,
  nombre: string,
  descripcion: string,
  peso: number,
  imgUrl: string,
  tipoMascota: {_id: string, nombre: string, tamanoRaza: string, edad: string},
  precio: number,
  promo: number
}
