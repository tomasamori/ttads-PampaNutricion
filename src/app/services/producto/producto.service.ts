import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Producto } from "../../models/producto";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URL_API = environment.URL_PRODUCTO;

  selectedProduct: Producto = {
  nombre: '',
  marca: '',
  descripcion:'',
  peso:0,
  imgUrl:'',
  tipoMascota: {_id:'', nombre:'', tamanoRaza: '', edad: ''},
  precio: 0,
  promo:0,
  amount:0
  };

  constructor(private http: HttpClient) { }
  productos: Producto[];
  
  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');

  getAllProducto() {
    return this.http.get<Producto[]>(this.URL_API);
  }

  createProducto(producto : Producto){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.post(this.URL_API, producto,{headers:headers});
  }

  updateProducto(producto : Producto){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.put(`${this.URL_API}/${producto._id}`, producto,{headers:headers});
  }

  deleteProduct(_id:string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getRecordById(_id: String): Observable<Producto>{
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Producto>(`${this.URL_API}/${_id}`,{headers:headers});
  }
}
