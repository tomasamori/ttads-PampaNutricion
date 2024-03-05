import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { TipoMascota } from "../../models/tipoMascota";
import { Producto } from "../../models/producto";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TipoMascotaService {

  URL_API = environment.URL_TIPOMASCOTA;

  selectedTipoMascota: TipoMascota = {
  nombre: '',
  tamanoRaza: '',
  edad:''  
  };

  constructor(private http: HttpClient) { }
  tipoMascotas: TipoMascota[];

  productos:Producto[];

  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');

  getAllTiposMascotas() {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<TipoMascota[]>(this.URL_API,{headers:headers});
  }

  createTipoMascota(tipoMascota : TipoMascota){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.post(this.URL_API, tipoMascota,{headers:headers});
  }

  updateTipoMascota(tipoMascota : TipoMascota){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.put(`${this.URL_API}/${tipoMascota._id}`, tipoMascota,{headers:headers});
  }

  deleteTipoMacota(_id:string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getRecordById(_id: String): Observable<TipoMascota>{
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<TipoMascota>(`${this.URL_API}/${_id}`,{headers:headers});
  }

  findProductoByTipoMascota(id: string) {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Producto[]>(`${this.URL_API}/productos/${id}`,{headers:headers});
  }
}
