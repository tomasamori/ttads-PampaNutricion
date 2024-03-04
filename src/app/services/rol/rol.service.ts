import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Rol } from "../../models/rol";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  URL_API = environment.URL_ROL;

  selectedRol: Rol = {
  name: ''
  };

  constructor(private http: HttpClient) { }
  Roles: Rol[];
  
  private token = localStorage.getItem('token');
  private id = localStorage.getItem('usuarioFoundId');


  getAllRoles() {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Rol[]>(this.URL_API,{headers:headers});
  }

  createRol(rol : Rol){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.post(this.URL_API, rol,{headers:headers});
  }

  updateRol(rol : Rol){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.put(`${this.URL_API}/${rol._id}`, rol,{headers:headers});
  }

  deleteRol(_id:string){
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
  }

  getRecordById(_id: String): Observable<Rol>{
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<Rol>(`${this.URL_API}/${_id}`,{headers:headers});
  }

  findUsuariosByRol(id: string) {
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'id': this.id
      }); 
    return this.http.get<boolean>(`${this.URL_API}/rol/${id}/usuarios`,{headers:headers});
  }
}
