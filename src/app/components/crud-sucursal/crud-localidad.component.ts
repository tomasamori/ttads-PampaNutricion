import { Component, OnInit } from '@angular/core';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import { Localidad } from 'src/app/models/localidad';
import { NgForm } from "@angular/forms";




@Component({
  selector: 'app-crud-localidad',
  templateUrl: './crud-localidad.component.html',
  styleUrls: ['./crud-localidad.component.css']
})
export class CrudLocalidadComponent implements OnInit {

  constructor(public LocalidadService: LocalidadService) { }
  InsertSuccess =false;
  errorMessage: string = "";

  
  ngOnInit(): void {
    this.getLocalidad(); 
    this.InsertSuccess =false;
  }


  resetForm(form: NgForm) {
  
    form.reset();
    this.getLocalidad();
    this.cambiarTituloModal("NUEVA LOCALIDAD");
    this.cambiarTituloModalSuccess("Localidad Creada con Exito!")

  }

  getLocalidad() {
    this.LocalidadService.getAllLocalidades().subscribe(
      (res) => {
        this.LocalidadService.Localidades = res;
      },
      err => console.log(err)
    )
  }

  addLocalidad(form: NgForm) {
    this.InsertSuccess = false;
    if (form.value._id) {
      this.LocalidadService.updateLocalidad(form.value).subscribe(
        res => {
        console.log(res);
        this.getLocalidad();
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
      this.LocalidadService.createLocalidad(form.value).subscribe(
        res => {
          this.getLocalidad();
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


  deleteLocalidad(id: string) {
    if (confirm('Seguro quieres eliminar esta localidad?')) {
      this.LocalidadService.deleteLocalidad(id).subscribe(
        (res) => {
          this.getLocalidad();
        },
        (err) => console.error(err)
      );
    }

  }

  editLocalidad(localidad: Localidad) {
   
    this.cambiarTituloModal("EDITAR LOCALIDAD");
    this.cambiarTituloModalSuccess("Localidad Actualizada con Exito!")
    this.LocalidadService.selectedLocalidad = localidad;
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
  this.getLocalidad();
}

  ModalClose(){
    this.InsertSuccess = false;
  }
    
  

}


