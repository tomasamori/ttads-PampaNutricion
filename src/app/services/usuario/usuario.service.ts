import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../models/usuario";
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  URL_API = environment.URL_USUARIO;

  selectedUsuario: Usuario = {
    usuario: '',
    password: '',
    email: '',
    rol: [], 
    cuil: '',
    nombre: '',
    fechaNacimiento: null,
    direccion: '', 
    telefono: ''  
  };

  constructor(private http: HttpClient) { }
  usuario: Usuario[];

  getAllUsuarios() {
    return this.http.get<Usuario[]>(this.URL_API);
  }

  createUsuario(usuario : Usuario){
    console.log(usuario.fechaNacimiento.toString());
    return this.http.post(this.URL_API, usuario);
  }

  updateUsuario(usuario : Usuario){
    return this.http.put(`${this.URL_API}/${usuario._id}`, usuario);
  }

  deleteUsuario(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }

  getRecordById(_id: String): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.URL_API}/${_id}`);
  }
}
