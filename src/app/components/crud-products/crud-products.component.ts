import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.css']
})
export class CrudProductsComponent implements OnInit {

  constructor(public productoService: ProductoService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productoService.getAllProducto().subscribe(
      (res) => {
        this.productoService.productos = res;
      },
      err => console.log(err)
    )
  }

  addproduct(form: NgForm){
    this.productoService.createProducto(form.value).subscribe(
      res =>{
        this.getProducts();
        form.reset();
      },
      err => console.log(err)
    )
  }
  
  deleteproduct(id: string){
    if (confirm('Seguro quieres eliminar este producto?')){
      this.productoService.deleteProduct(id).subscribe(
        (res) => {
          this.getProducts();
        },
        (err) => console.error(err)
      );
    }
    
  }

}
