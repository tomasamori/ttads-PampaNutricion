import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

  getAllLocalidades() {
    return this.http.get<Localidad[]>(this.URL_API);
  }

  createLocalidad(localidad : Localidad){
    return this.http.post(this.URL_API, localidad);
  }

  updateLocalidad(localidad : Localidad){
    return this.http.put(`${this.URL_API}/${localidad._id}`, localidad);
  }

  deleteLocalidad(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<Localidad>{
    return this.http.get<Localidad>(`${this.URL_API}/${_id}`);
  }

  findSucursalByLocalidad(id: string) {
    return this.http.get<Storelocator[]>(`${this.URL_API}/${id}/sucursales`);
  }

}
