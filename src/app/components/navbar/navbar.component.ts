import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  registrationSuccess = false;
  loginSuccess: boolean = false;
  open: boolean;
  forgotPasswordFormSuccess = false;
  errorMessage: string = "";
  isCliente = false;
  isAdmin = false;
  isEmpleado = false;
  constructor(public authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('usuarioFoundId')) {
      if (localStorage.getItem('token')) {
        this.loginSuccess = true;
        if (localStorage.getItem('rol') === 'cliente') {
          this.isCliente = true;
        } else {
          this.isCliente = false;
          if (localStorage.getItem('rol') === 'admin') {
            this.isAdmin = true;
          } else {
            this.isEmpleado = true;
          }
        }
      }
    }
  }

  CloseModal(id: string): void {
    if (id === 'ForgotPass' || id === 'Register') {
      setTimeout(() => {
        document.getElementById(id).classList.remove('show');
        document.querySelector('.modal-backdrop').remove();
        window.location.reload();
      }, 2000);
    } else {
      setTimeout(() => {
        document.getElementById(id).classList.remove('show');
        document.querySelector('.modal-backdrop').remove();
        window.location.reload();
      }, 1200);
    }    
  }


  logOut() {
    this.router.navigate(['/home']);
    localStorage.clear();
    this.isAdmin = false;
    this.isEmpleado = false;
    this.loginSuccess = false;
    this.toastr.success('Sesión cerrada con éxito')
  }

  readName() {
    return localStorage.getItem('usuarioFoundNombre');
  }
  
  login(form: NgForm) {
    this.authService.login(form.value)
      .subscribe(res => {
        this.loginSuccess = true;
        localStorage.setItem('usuarioFoundId', res['usuarioFoundId']);
        localStorage.setItem('token', res['token']);
        localStorage.setItem('rol', res['usuarioFoundRol']);
        localStorage.setItem('usuarioFoundNombre', res['usuarioFoundNombre']);
        localStorage.setItem('usuarioFoundCuil', res['usuarioFoundCuil']);
        form.reset();
        if (localStorage.getItem('rol') === 'admin') {
          this.isAdmin = true;
        }
        this.toastr.success("¡Bienvenido a Pampa Nutrición!");
        this.CloseModal('login');
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

  modalClear(form: NgForm){
    form.reset();
    this.errorMessage='';
  }

  forgotPasswordModalClear(form: NgForm){
    this.errorMessage='';
  }

  register(form: NgForm) {
    this.authService.register(form.value)
      .subscribe(res => {
        form.reset();
        this.registrationSuccess = true;
        this.toastr.success('Usuario registrado con éxito');
        this.CloseModal('Register')
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

  isSubmitting: boolean = false;

  forgotPassword(form: NgForm) {
    this.isSubmitting = true;
    this.authService.forgotPassword(form.value)
      .subscribe(
        res => {
          form.reset();
          this.forgotPasswordFormSuccess = true;
          this.isSubmitting = false;
          this.toastr.success('Se ha enviado un correo con las instrucciones para restablecer su contraseña');
          this.CloseModal('ForgotPass')
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
