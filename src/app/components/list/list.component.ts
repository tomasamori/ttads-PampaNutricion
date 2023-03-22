import { Component, OnInit } from "@angular/core";
import {ProductoService} from "../../services/producto/producto.service";
import {Router} from "@angular/router";
import { Producto } from "src/app/models/producto";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public productoService: ProductoService, private router:Router) { }

  productList: Producto[] = [];
  filterProduct = '';

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getAllProducto().subscribe(
      data => {
        this.productoService.productos = data;
        this.productList = data;
      },
      err => console.log(err)
    )
  };

  filterProductsByPetName(petName: string) {
    this.productoService.productos = this.productList.filter(product => product.tipoMascota.nombre == petName);
    return (this.productoService.productos);
  }

  filterProductsByPetSize(petSize: string) {
    this.productoService.productos = this.productList.filter(product => product.tipoMascota.tamanoRaza == petSize);
    return (this.productoService.productos);
  }

  filterProductsByPetAge(petAge: string) {
    this.productoService.productos = this.productList.filter(product => product.tipoMascota.edad == petAge);
    return (this.productoService.productos);
  }

  clearFilters() {
    this.productoService.productos = this.productList;
  }

}
