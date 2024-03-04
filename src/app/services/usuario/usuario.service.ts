import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders } from "@angular/common/http";
import { Usuario } from "../../models/usuario";
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    URL_API = environment.URL_USUARIO;

    selectedUsuario: Usuario = {
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

    private token = localStorage.getItem('token');
    private id = localStorage.getItem('usuarioFoundId');


    getAllUsuario() {
        const headers = new HttpHeaders({
            'x-access-token': this.token,
            'id': this.id
            }); 
        
        return this.http.get<Usuario[]>(this.URL_API,{headers:headers}).subscribe(
            (res) => {
                this.usuarios = res;
            },
            err => console.log(err)
        )
    }

    createUsuario(usuario : Usuario){
        const headers = new HttpHeaders({
            'x-access-token': this.token,
            'id': this.id
            }); 
        return this.http.post(this.URL_API, usuario,{headers:headers});
    }

    updateUsuario(usuario : Usuario){
        const headers = new HttpHeaders({
            'x-access-token': this.token,
            'id': this.id
            }); 
        return this.http.put(`${this.URL_API}/${usuario._id}`, usuario,{headers:headers});
    }

    deleteUsuario(_id:string){
        const headers = new HttpHeaders({
            'x-access-token': this.token,
            'id': this.id
            }); 
        return this.http.delete(`${this.URL_API}/${_id}`,{headers:headers})
    }

    getRecordById(_id: String){
        const headers = new HttpHeaders({
            'x-access-token': this.token,
            'id': this.id
            }); 
        return this.http.get<Usuario>(`${this.URL_API}/${_id}`,{headers:headers});
    }
}
