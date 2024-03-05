import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Localidad } from "../../models/localidad";
import { Storelocator } from "../../models/store-locator";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  URL_API = environment.URL_LOCALIDAD;

  selectedLocalidad: Localidad = {
  codPostal:'',
  nombre: ''
  };

  constructor(private http: HttpClient) { }
  Localidades: Localidad[];
  
  Sucursales: Storelocator[];

  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');

  getAllLocalidades() {
      const headers = new HttpHeaders({
    'x-access-token': this.token,
    'id': this.id
    }); 
    return this.http.get<Localidad[]>(this.URL_API,{headers:headers});
  }

  createLocalidad(localidad : Localidad){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.post(this.URL_API, localidad,{headers:headers});
  }

  updateLocalidad(localidad : Localidad){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.put(`${this.URL_API}/${localidad._id}`, localidad,{headers:headers});
  }

  deleteLocalidad(_id:string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getRecordById(_id: String): Observable<Localidad>{
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Localidad>(`${this.URL_API}/${_id}`,{headers:headers});
  }

  findSucursalByLocalidad(id: string) {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Storelocator[]>(`${this.URL_API}/sucursales/${id}`,{headers:headers});
  }

}
