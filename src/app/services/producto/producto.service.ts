import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
  tipoMascota: {nombre:'', tamanoRaza: '', edad: ''},
  precio: 0,
  promo:0,
  amount:0
  };

  constructor(private http: HttpClient) { }
  productos: Producto[];

  getAllProducto() {
    return this.http.get<Producto[]>(this.URL_API);
  }

  createProducto(producto : Producto){
    return this.http.post(this.URL_API, producto);
  }

  updateProducto(producto : Producto){
    return this.http.put(`${this.URL_API}/${producto._id}`, producto);
  }

  deleteProduct(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<Producto>{
    return this.http.get<Producto>(`${this.URL_API}/${_id}`);
  }
}
