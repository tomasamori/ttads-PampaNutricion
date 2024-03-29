import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from "@angular/forms";
import { DatePipe } from '@angular/common';
import { Rol } from 'src/app/models/rol';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-crud-usuario',
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private datePipe: DatePipe, public rolService: RolService,private router: Router, private toastr: ToastrService) { }
  InsertSuccess =false;
  isDisabled = false;
  errorMessage: string = "";
  
  rol:Rol;


  ngOnInit(): void {
    
    if (localStorage.getItem('rol') === 'admin') {
      this.getUsuario(); 
      this.InsertSuccess =false;
      this.getRols();
    }
    else {
      this.router.navigate(['/home']);
    }
  } 

  resetForm(form: NgForm) {
    this.isDisabled = false;
    form.reset();
    this.getUsuario();
    this.getRols();
    this.cambiarTituloModal("NUEVO USUARIO");
    this.cambiarTituloModalSuccess("Usuario creado con éxito")
  }

  getUsuario() {
    return this.usuarioService.getAllUsuario();
  }

  addUsuario(form: NgForm) {
    this.InsertSuccess = true;
    this.isDisabled = false;
    if (form.value._id) {
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
    this.usuarioService.findOrdersByUser(id).subscribe(
      (res: any[]) => {
        if (!(res && res.length > 0)) {
          if (confirm('¿Seguro quiere eliminar este usuario?')) {
            this.usuarioService.deleteUsuario(id).subscribe(
              () => {
                this.getUsuario();
                this.toastr.success('Usuario eliminado con éxito');
              },
              (err) => console.error(err)
            );
          } else {
          }
        } else {
          alert('No se puede eliminar el usuario porque tiene pedidos asociados');
        }
      },
      (err) => console.error(err)
    );
  }

  editUsuario(usuario: Usuario) {
    let fechaNacimiento = new Date(usuario.fechaNacimiento);
    this.isDisabled = true;
    this.cambiarTituloModal("EDITAR USUARIO");
    this.cambiarTituloModalSuccess("Usuario actualizado con éxito")
    this.usuarioService.selectedUsuario = usuario;
    this.usuarioService.selectedUsuario.fechaNacimiento = fechaNacimiento;
    this.usuarioService.selectedUsuario.rol._id = usuario.rol._id;
    

  }

  getRols() {
    this.rolService.getAllRoles().subscribe(
      (res) => {
        this.rolService.Roles = res;
      },
      err => {console.log(err)
      }
    )
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

  //Pruebas

  transformDate(date): string{
    return this.datePipe.transform(date, 'short');
  }

  formatearFecha(date){
    return new Date(date).toLocaleDateString('es-ES', {timeZone: 'UTC'});
  }
}


