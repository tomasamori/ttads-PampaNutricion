import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from "@angular/forms";
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  
  register(form: NgForm){
    this.authService.register(form.value)
      .subscribe(res => {
        console.log(res); // acá va a mostrar el token que vuelve del back. habría que guardar el token en el local storage y redirigir al usuario a la home logueado (luego usar ese token para hacer peticiones al back y que el back sepa que el usuario está logueado)
      },
      err => console.log(err)
    )}
  
  
  
}