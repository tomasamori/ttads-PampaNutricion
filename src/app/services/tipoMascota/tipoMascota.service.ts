import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

  getAllTiposMascotas() {
    return this.http.get<TipoMascota[]>(this.URL_API);
  }

  createTipoMascota(tipoMascota : TipoMascota){
    return this.http.post(this.URL_API, tipoMascota);
  }

  updateTipoMascota(tipoMascota : TipoMascota){
    return this.http.put(`${this.URL_API}/${tipoMascota._id}`, tipoMascota);
  }

  deleteTipoMacota(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<TipoMascota>{
    return this.http.get<TipoMascota>(`${this.URL_API}/${_id}`);
  }

  findProductoByTipoMascota(id: string) {
    return this.http.get<Producto[]>(`${this.URL_API}/${id}/productos`);
  }
}
