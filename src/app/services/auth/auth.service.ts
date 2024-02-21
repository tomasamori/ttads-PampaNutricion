import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../models/usuario";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL_API = environment.URL_AUTH;

  constructor(private http: HttpClient) { }

  user: Usuario = {
    usuario: '',
    password: '',
    email: '',
    rol: [],
    cuil: '',
    nombre: '',
    fechaNacimiento: new Date(),
    direccion: '',
    telefono: ''
  };

  login(user: Usuario) {
    return this.http.post(this.URL_API + '/signin', user);
  }

  register(user: Usuario) {
    return this.http.post(this.URL_API + '/signup', user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.URL_API + '/forgot-password', email);
  }

  resetPassword(token: string, newPass: string) {
    return this.http.post(this.URL_API + '/reset-password/' + token, { token, newPass });
  }

}