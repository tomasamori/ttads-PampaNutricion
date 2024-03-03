export interface Pedido {
  _id?: string;
  nroPedido: number;
  usuario: {
    _id?: string,
    usuario: string,
    password: string,
    email: string,
    rol: {_id: string, name: string}, 
    cuil: string,
    nombre: string,
    fechaNacimiento: Date,
    direccion: string, 
    telefono: string
  };
  items: {
    producto: {
      _id?: string,
      marca: string,
      nombre: string,
      descripcion: string,
      peso: number,
      imgUrl: string,
      tipoMascota: { _id: string, nombre: string, tamanoRaza: string, edad: string },
      precio: number,
      promo: number,
      amount: number
    },
    cantidad: number,
  }[];
  subtotal: number;
  total: number;
  estado: string;
  createdAt?: Date;
}