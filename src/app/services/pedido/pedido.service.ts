import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  URL_API = environment.URL_PEDIDO;

  selectedPedido: Pedido = {
    _id: '',
    nroPedido: 0,
    usuario: {_id: '', usuario: '', password: '', email: '', rol: [''], cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: ''},
    productos: [],
    cantidad: [],
    subtotal: 0,
    total: 0,
    estado: '',
    createdAt: new Date()
  };
  
  constructor(private http: HttpClient) { }

  pedidos: Pedido[];

  getAllPedido() {
    return this.http.get<Pedido[]>(this.URL_API).subscribe(
      (res) => {
        this.pedidos = res;
      },
      err => console.log(err)
    )
  }

  updatePedido(pedido: Pedido) {
    return this.http.put(`${this.URL_API}/${pedido._id}`, pedido);
  }

  deletePedido(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }
}
