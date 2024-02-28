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
        _id: '',
        usuario: '',
        password: '',
        email: '',
        rol: {_id: '', name: ''},
        cuil: '',
        nombre: '',
        fechaNacimiento: new Date(),
        direccion: '',
        telefono: ''
    };

    constructor(private http: HttpClient) { }

    usuarios: Usuario[];

    getAllUsuario() {
        return this.http.get<Usuario[]>(this.URL_API).subscribe(
            (res) => {
                this.usuarios = res;
            },
            err => console.log(err)
        )
    }

    createUsuario(usuario : Usuario){
        return this.http.post(this.URL_API, usuario);
    }

    updateUsuario(usuario : Usuario){
        return this.http.put(`${this.URL_API}/${usuario._id}`, usuario);
    }

    deleteUsuario(_id:string){
        return this.http.delete(`${this.URL_API}/${_id}`)
    }

    getRecordById(_id: String){
        return this.http.get<Usuario>(`${this.URL_API}/${_id}`);
    }
}
