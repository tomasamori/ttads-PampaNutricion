export interface Pedido {
    _id?: any,
    usuario: string,
    nroPedido?: number,
    productos: string[],
    cantidad : number[],
    subtotal: number,
    total:number,
    estado:string
  }