import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
  

  getAllRoles() {
    return this.http.get<Rol[]>(this.URL_API);
  }

  createRol(rol : Rol){
    return this.http.post(this.URL_API, rol);
  }

  updateRol(rol : Rol){
    return this.http.put(`${this.URL_API}/${rol._id}`, rol);
  }

  deleteRol(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<Rol>{
    return this.http.get<Rol>(`${this.URL_API}/${_id}`);
  }

  findUsuariosByRol(id: string) {
    return this.http.get<boolean>(`${this.URL_API}/rol/${id}/usuarios`);
  }
}
