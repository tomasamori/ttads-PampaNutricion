import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  registrationSuccess = false;
  errorMessage: string = "";
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  
  login(form: NgForm) {
    this.authService.login(form.value)
    .subscribe(res => {
      console.log(res);
      this.registrationSuccess = true;
      form.reset();
    },
    err => {
      console.log(err);
      if (err && err.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Se produjo un error desconocido';
      }
      this.registrationSuccess = false;
    }
    )
  }
  
  register(form: NgForm){
    this.authService.register(form.value)
      .subscribe(res => {
        form.reset();
        console.log(res); // acá va a mostrar el token que vuelve del back. habría que guardar el token en el local storage y redirigir al usuario a la home logueado (luego usar ese token para hacer peticiones al back y que el back sepa que el usuario está logueado)
        this.registrationSuccess = true;
      },
      err => {
        console.log(err);
        if (err && err.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Se produjo un error desconocido';
        }
        this.registrationSuccess = false;
      }
    )}  
    }
