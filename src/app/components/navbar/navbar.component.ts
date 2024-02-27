import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from "@angular/forms";
import { empty } from 'rxjs';
import { Router } from '@angular/router'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  registrationSuccess = false;
  loginSuccess = false;
  forgotPasswordFormSuccess = false;
  errorMessage: string = "";
  isCliente = false;
  isAdmin = false;
  isEmpleado = false;
  
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (localStorage.getItem('usuarioFoundId')){
      if (localStorage.getItem('token')){
      this.loginSuccess = true;
      if (localStorage.getItem('rol') === 'cliente'){
        this.isCliente = true; 
      } else {
        this.isCliente = false;
        if (localStorage.getItem('rol') === 'admin'){
          this.isAdmin = true;
        } else{
          this.isEmpleado = true;
        }
      }
      }
    }
  }

  logOut(){
    this.router.navigate(['/home']);
    localStorage.clear();
    this.loginSuccess = false;
  }
  
  login(form: NgForm) {
    this.authService.login(form.value)
    .subscribe(res => {
      this.loginSuccess = true;
      localStorage.setItem('usuarioFoundId',res['usuarioFoundId']);
      localStorage.setItem('token',res['token']);
      localStorage.setItem('rol',res['usuarioFoundRol']);
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

  isSubmitting: boolean = false;

  forgotPassword(form: NgForm) {
    this.isSubmitting = true;
    this.authService.forgotPassword(form.value)
      .subscribe(
        res => {
          form.reset();
          this.forgotPasswordFormSuccess = true;
          this.isSubmitting = false;
        },
        err => {
          console.log(err);
          if (err && err.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Se produjo un error desconocido';
          }
          this.forgotPasswordFormSuccess = false;
          this.isSubmitting = false;
        }
      );
  }
}
