import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from "../../models/producto";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  URL_API = environment.URL_PRODUCTO;

  constructor(private http: HttpClient) { }
  producto: Producto[];

  getAllProducto() {
    return this.http.get<Producto[]>(this.URL_API);
  }
}
