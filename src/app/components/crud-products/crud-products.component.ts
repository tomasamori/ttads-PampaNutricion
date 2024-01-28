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

  constructor(public productoService: ProductoService, public tipoMascotasService: TipoMascotaService) { }

  tipoMascota: TipoMascota;

  ngOnInit(): void {
    this.getProducts();
  }

  resetForm(form: NgForm) {
    form.reset();
    this.getProducts();
    this.getTypesOfPets();
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
    if (form.value._id) {
      this.productoService.updateProducto(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    } else {
      this.productoService.createProducto(form.value).subscribe(
        res => {
          this.getProducts();
          form.reset();
        },
        err => console.log(err)
      )
    }
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
    this.productoService.selectedProduct = product;
    
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
 tituloModal: string = 'NUEVO PRODUCTO';

 // Método para cambiar el título del modal
 cambiarTituloModal(nuevoTitulo: string) {
   this.tituloModal = nuevoTitulo;
 }

}
