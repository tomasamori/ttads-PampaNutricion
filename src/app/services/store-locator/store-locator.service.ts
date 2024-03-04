import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Storelocator } from "../../models/store-locator";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import {UploadFotoService} from 'src/app/services/Cloudinary/upload-foto.service'
@Injectable({
  providedIn: 'root'
})
export class StoreLocatorService {
  URL_API = environment.URL_SUCURSAL;
  selectedSucursal: Storelocator = {
    _id: '',
    nombre: '',
    direccion: '',
    localidad:{_id:'', codPostal: '', nombre: ''},
    foto: ''
    };
    constructor(private http: HttpClient,private _UploadFotoService:UploadFotoService) { }
    storeLocators: Storelocator[];
    
    private token = localStorage.getItem('token');
    private id = localStorage.getItem('usuarioFoundId');


    getAllStorelocator() {
      return this.http.get<Storelocator[]>(this.URL_API);
    }

    createStorelocator(storelocator : Storelocator)
    { 
      const headers = new HttpHeaders({
        'x-access-token': this.token,
        'id': this.id
        }); 
    return this.http.post(this.URL_API, storelocator,{headers:headers});
    }
  
    updateStorelocator(storelocator : Storelocator){
      const headers = new HttpHeaders({
        'x-access-token': this.token,
        'id': this.id
        }); 
      return this.http.put(`${this.URL_API}/${storelocator._id}`, storelocator,{headers:headers});
    }
  
    deleteStorelocator(direccion:string){
      const headers = new HttpHeaders({
        'x-access-token': this.token,
        'id': this.id
        }); 
      return this.http.delete(`${this.URL_API}/${direccion}`,{headers:headers})
    }
  
    getRecordById(direccion: String): Observable<Storelocator>{
      const headers = new HttpHeaders({
        'x-access-token': this.token,
        'id': this.id
        }); 
      return this.http.get<Storelocator>(`${this.URL_API}/${direccion}`,{headers:headers});
    }

}
