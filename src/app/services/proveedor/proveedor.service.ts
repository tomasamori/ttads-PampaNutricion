import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Proveedor } from "../../models/proveedor";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  URL_API = environment.URL_PROVEEDOR;

  selectedProveedor: Proveedor = {
    cuil: '',
    cuit: '',
    razonSocial: '' ,
    email: '',
    telefono: ''
  };

  constructor(private http: HttpClient) { }
  Proveedores: Proveedor[];
  

  getAllProveedores() {
    return this.http.get<Proveedor[]>(this.URL_API);
  }

  createProveedor(proveedor : Proveedor){
    return this.http.post(this.URL_API, proveedor);
  }

  updateProveedor(proveedor : Proveedor){
    return this.http.put(`${this.URL_API}/${proveedor._id}`, proveedor);
  }

  deleteProveedor(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<Proveedor>{
    return this.http.get<Proveedor>(`${this.URL_API}/${_id}`);
  }

}
