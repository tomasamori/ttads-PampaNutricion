import { Component, OnInit } from '@angular/core';
import { StoreLocatorService } from 'src/app/services/store-locator/store-locator.service';
import { NgForm } from "@angular/forms";
import { Storelocator } from 'src/app/models/store-locator';
import { Localidad } from 'src/app/models/localidad';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';




@Component({
  selector: 'app-crud-sucursal',
  templateUrl: './crud-sucursal.component.html',
  styleUrls: ['./crud-sucursal.component.css']
})
export class CrudSucursalComponent implements OnInit {

  localidad: Localidad;

  constructor(public StoreLocatorService: StoreLocatorService, public LocalidadService: LocalidadService) { }
  InsertSuccess =false;
  errorMessage: string = "";

  
  ngOnInit(): void {
    this.getSucursal(); 
    this.InsertSuccess =false;
  }


  resetForm(form: NgForm) {
  
    form.reset();
    this.getSucursal();
    this.getLocators();
    this.cambiarTituloModal("NUEVA SUCURSAL");
    this.cambiarTituloModalSuccess("Sucursal Creada con Exito!")

  }

  getSucursal() {
    this.StoreLocatorService.getAllStorelocator().subscribe(
      (res) => {
        this.StoreLocatorService.storeLocators = res;
      },
      err => console.log(err)
    )
  }

  addSucursal(form: NgForm) {
    this.InsertSuccess = false;
    if (form.value._id) {
      this.StoreLocatorService.updateStorelocator(form.value).subscribe(
        res => {
        console.log(res);
        this.getSucursal();
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
      this.StoreLocatorService.createStorelocator(form.value).subscribe(
        res => {
          this.getSucursal();
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


  deleteSucursal(id: string) {
    if (confirm('Seguro quieres eliminar esta sucursal?')) {
      this.StoreLocatorService.deleteStorelocator(id).subscribe(
        (res) => {
          this.getSucursal();
        },
        (err) => console.error(err)
      );
    }

  }

  editSucursal(sucursal: Storelocator) {
  
    this.cambiarTituloModal("EDITAR SUCURSAL");
    this.cambiarTituloModalSuccess("Sucursal Actualizada con Exito!")
    this.StoreLocatorService.selectedSucursal = sucursal;
    this.getLocators();
  }

  getLocators() {
    this.LocalidadService.getAllLocalidades().subscribe(
      (res) => {
        this.LocalidadService.Localidades = res;
      },
      err => console.log(err)
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
  this.getSucursal();
}

  ModalClose(){
    this.InsertSuccess = false;
  }
    
  

}


