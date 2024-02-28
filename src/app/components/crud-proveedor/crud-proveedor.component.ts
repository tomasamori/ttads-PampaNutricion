import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/services/proveedor/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';
import { NgForm } from "@angular/forms";




@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})
export class CrudProveedorComponent implements OnInit {

  constructor(public ProveedorService: ProveedorService) { }
  DependencyError =false;
  InsertSuccess =false;
  errorMessage: string = "";

  
  ngOnInit(): void {
    this.getProveedor(); 
    this.InsertSuccess =false;
  }


  resetForm(form: NgForm) {
  
    form.reset();
    this.getProveedor();
    this.cambiarTituloModal("NUEVO PROVEEDOR");
    this.cambiarTituloModalSuccess("Proveedor Creado con Exito!")

  }

  getProveedor() {
    this.ProveedorService.getAllProveedores().subscribe(
      (res) => {
        this.ProveedorService.Proveedores = res;
      },
      err => console.log(err)
    )
  }

  addProveedor(form: NgForm) {
    this.InsertSuccess = false;
    if (form.value._id) {
      this.ProveedorService.updateProveedor(form.value).subscribe(
        res => {
        console.log(res);
        this.getProveedor();
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
      this.ProveedorService.createProveedor(form.value).subscribe(
        res => {
          this.getProveedor();
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


  deleteProveedor(id: string) {
    if (confirm('Seguro quieres eliminar esta localidad?')) {
      this.ProveedorService.deleteProveedor(id).subscribe(
        (res) => {
          this.getProveedor();
        },
        (err) => console.error(err)
      );
    }
  }

  

  editProveedor(proveedor: Proveedor) {
   
    this.cambiarTituloModal("EDITAR PROVEEDOR");
    this.cambiarTituloModalSuccess("Proveedor Actualizado con Exito!")
    this.ProveedorService.selectedProveedor = proveedor;
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
  this.getProveedor();
}

  ModalClose(){
    this.InsertSuccess = false;
    this.DependencyError = false;
  }
    
  

}


