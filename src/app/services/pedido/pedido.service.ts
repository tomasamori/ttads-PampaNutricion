import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    usuario: {_id: '', usuario: '', password: '', email: '', rol: {_id: '', name: ''}, cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: ''},
    items: [{producto: {_id: '', marca: '', nombre: '', descripcion: '', peso: 0, imgUrl: '', tipoMascota: {_id: '', nombre: '', tamanoRaza: '', edad: ''}, precio: 0, promo: 0, amount: 0}, cantidad: 0}],
    subtotal: 0,
    total: 0,
    estado: '',
    createdAt: new Date()
  };
  
  constructor(private http: HttpClient) { }

  pedidos: Pedido[];

  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');


  createPedido(pedido: Pedido){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
    });
     return this.http.post<Pedido>(this.URL_API, pedido,{headers:headers});
   }

  getAllPedido() {
    // Configuración del encabezado con el token de seguridad
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
    });
    
    return this.http.get<Pedido[]>(this.URL_API, { headers: headers }).subscribe(
      (res) => {
        this.pedidos = res;
      },
      err => console.log(err)
    )
  }

  updatePedido(pedido: Pedido) {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
    });
    return this.http.put(`${this.URL_API}/${pedido._id}`, pedido, { headers: headers }).subscribe(
      (res) => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  deletePedido(_id: string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
    });
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getPedidosByUser(userId: string) {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
    });
    return this.http.get<Pedido[]>(`${this.URL_API}/usuario/${userId}`, { headers: headers }).subscribe(
      (res) => {
        this.pedidos = res;
      },
      err => console.log(err)
    );
  }

  loadImageAsBase64(imageUrl: string): Promise<string> {
    return this.http.get(imageUrl, { responseType: 'blob' })
      .toPromise()
      .then(blob => this.blobToBase64(blob));
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
