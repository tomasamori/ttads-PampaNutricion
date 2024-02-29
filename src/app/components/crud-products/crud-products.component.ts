import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { TipoMascotaService } from 'src/app/services/tipoMascota/tipoMascota.service';
import { NgForm } from "@angular/forms";
import { Producto } from 'src/app/models/producto';
import { TipoMascota } from 'src/app/models/tipoMascota';



@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.css']
})
export class CrudProductsComponent implements OnInit {
  InsertSuccess =false;
  errorMessage: string = "";
  constructor(public productoService: ProductoService, public tipoMascotasService: TipoMascotaService) { }
 
  tipoMascota: TipoMascota;
  

  ngOnInit(): void {
    this.getProducts(); 
    this.InsertSuccess =false;
    this.getTypesOfPets();

  }


  resetForm(form: NgForm) {
  
    form.reset();
    this.getProducts();
    this.getTypesOfPets();
    this.cambiarTituloModal("NUEVO PRODUCTO");
    this.cambiarTituloModalSuccess("Producto Creado con Exito!")
    this.productoService.selectedProduct.tipoMascota._id = '';

  }

  getProducts() {
    this.productoService.getAllProducto().subscribe(
      (res) => {
        this.productoService.productos = res;
      },
      err => console.log(err)
    )
  }

  addproduct(form: NgForm) {
    this.InsertSuccess = false;
    if (form.value._id) {
      this.productoService.updateProducto(form.value).subscribe(
        res => {
        console.log(res);
        this.getProducts();
        this.InsertSuccess = true; 
        form.reset();  
        setTimeout(() => {
          this.ModalClose();
        }, 2000);
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
      this.productoService.createProducto(form.value).subscribe(
        res => {
          this.getProducts();
          form.reset();
          console.log('antes', this.InsertSuccess)
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


  deleteProduct(id: string) {
    if (confirm('Seguro quieres eliminar este producto?')) {
      this.productoService.deleteProduct(id).subscribe(
        (res) => {
          this.getProducts();
        },
        (err) => console.error(err)
      );
    }

  }

  editProduct(product: Producto) {
    this.cambiarTituloModal("EDITAR PRODUCTO");
    this.cambiarTituloModalSuccess("Producto Actualizado con Exito!")
    this.productoService.selectedProduct = product;
    this.productoService.selectedProduct.tipoMascota._id = product.tipoMascota._id;

  }

  getTypesOfPets() {
    this.tipoMascotasService.getAllTiposMascotas().subscribe(
      (res) => {
        this.tipoMascotasService.tipoMascotas = res;
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
  this.getProducts();
  
}

  ModalClose(){
    this.InsertSuccess = false;
  }
    
  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value.toUpperCase();
    // Asigna el nuevo valor en mayúsculas al modelo
    this.productoService.selectedProduct.nombre = newValue;
  }

}


