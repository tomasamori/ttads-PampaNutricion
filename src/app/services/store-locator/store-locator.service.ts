import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Storelocator } from "../../models/store-locator";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StoreLocatorService {
  URL_API = environment.URL_SUCURSAL;
  selectedTipoMascota: Storelocator = {
    nombre: '',
    direccion: '',
    foto: '',
    localidad:{codPostal: '', nombre: ''}
    };
    constructor(private http: HttpClient) { }
    storeLocators: Storelocator[];
    
    getAllStorelocator() {
      return this.http.get<Storelocator[]>(this.URL_API);
    }
  
    createStorelocator(storelocator : Storelocator){
      return this.http.post(this.URL_API, storelocator);
    }
  
    updateStorelocator(storelocator : Storelocator){
      return this.http.put(`${this.URL_API}/${storelocator.direccion}`, storelocator);
    }
  
    deleteStorelocator(direccion:string){
      return this.http.delete(`${this.URL_API}/${direccion}`)
    }
  
    getRecordById(direccion: String): Observable<Storelocator>{
      return this.http.get<Storelocator>(`${this.URL_API}/${direccion}`);
    }

}