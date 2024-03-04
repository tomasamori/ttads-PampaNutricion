import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
  
  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');
  
  constructor(private http: HttpClient) { }
  Proveedores: Proveedor[];
  

  getAllProveedores() {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Proveedor[]>(this.URL_API,{headers:headers});
  }

  createProveedor(proveedor : Proveedor){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.post(this.URL_API, proveedor,{headers:headers});
  }

  updateProveedor(proveedor : Proveedor){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.put(`${this.URL_API}/${proveedor._id}`, proveedor,{headers:headers});
  }

  deleteProveedor(_id:string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getRecordById(_id: String): Observable<Proveedor>{
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Proveedor>(`${this.URL_API}/${_id}`,{headers:headers});
  }

}
