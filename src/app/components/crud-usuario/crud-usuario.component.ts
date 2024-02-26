import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private datePipe: DatePipe) { }
  InsertSuccess =false;
  isDisabled = false;
  errorMessage: string = "";
  


  ngOnInit(): void {
    this.getUsuario(); 
    this.InsertSuccess =false;
  }


  resetForm(form: NgForm) {
    this.isDisabled = false;
    form.reset();
    this.getUsuario();
    this.cambiarTituloModal("NUEVO USUARIO");
    this.cambiarTituloModalSuccess("Usuario Creado con Exito!")

  }

  getUsuario() {
    return this.usuarioService.getAllUsuario();
  }

  addUsuario(form: NgForm) {
    this.InsertSuccess = true;
    this.isDisabled = false;
    if (form.value._id) {
      console.log(form.value, 'Fecha Nacimiento')
      this.isDisabled = true;
      this.usuarioService.updateUsuario(form.value).subscribe(
        res => {
        console.log(res);
        this.getUsuario();
        this.InsertSuccess = true;      
      },
        err => {
          console.log(err);
          if (err && err.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Se produjo un error desconocido';
           }
        }
      )
        
        } else {
          this.isDisabled = false;
      this.usuarioService.createUsuario(form.value).subscribe(
        res => {
          this.getUsuario();
          form.reset();
          this.InsertSuccess = true;
        },
        err => {console.log(err);
          if (err && err.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Se produjo un error desconocido';
           }
          this.InsertSuccess = false;
        }
      )
    }
    this.InsertSuccess = false;
  }


  deleteUsuario(id: string) {
    if (confirm('Seguro quieres eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(
        (res) => {
          this.getUsuario();
        },
        (err) => console.error(err)
      );
    }

  }

  editUsuario(usuario: Usuario) {
    let fechaNacimiento = new Date(usuario.fechaNacimiento);
    this.isDisabled = true;
    this.cambiarTituloModal("EDITAR USUARIO");
    this.cambiarTituloModalSuccess("Usuario Actualizado con Exito!")
    this.usuarioService.selectedUsuario = usuario;
    this.usuarioService.selectedUsuario.fechaNacimiento = fechaNacimiento;
    

  }


 // Propiedad para almacenar el título dinámico del modal
 tituloModal: string = '';
 tituloModalSucces: string = '';

 // Método para cambiar el título del modal
 cambiarTituloModal(nuevoTitulo: string) {
   this.tituloModal = nuevoTitulo;
 }

 cambiarTituloModalSuccess(nuevoTitulo: string) {
  this.tituloModalSucces = nuevoTitulo;
}

 cancel() {
  this.getUsuario();
}

  ModalClose(){
    this.InsertSuccess = false;
  }

  formatDate(date: any): string {
    // Verificar si date es un objeto Date válido
    if (!(date instanceof Date) || isNaN(date.getTime())) return ''; // Si no es válido, devolver una cadena vacía
  
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Añade ceros a la izquierda si es necesario
    const dd = String(date.getDate() + 1).padStart(2, '0'); // Añade ceros a la izquierda si es necesario
    return `${yyyy}-${mm}-${dd}`;
  }

  transformDate(date): string{
    return this.datePipe.transform(date, 'short');
  }

  formatearFecha(date){
    return new Date(date).toLocaleDateString('es-ES', {timeZone: 'UTC'});
  }
}


