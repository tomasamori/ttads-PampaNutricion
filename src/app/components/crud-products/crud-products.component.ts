import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';

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
      res => {
        this.productoService.productos = res;
      },
      err => console.log(err)
    )
  }

}
