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
  minPrice = 0;
  maxPrice = 99999999;

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

  filterProductsByPrice(price: string) {
    if (price == 'Mayor') {
      this.productoService.productos = this.productoService.productos.sort((a, b) => {
        return (b.precio - a.precio);
      });
    }

    if (price == 'Menor') {
      this.productoService.productos = this.productoService.productos.sort((a, b) => {
        return (a.precio - b.precio);
      });
    }
  }

  filterProductsByPriceRange() {
    if (this.minPrice > 0 && this.maxPrice < 99999999) {
      this.productoService.productos = this.productList.filter(product => (product.promo == 0 && product.precio >= this.minPrice && product.precio <= this.maxPrice) || (product.promo > 0 && (product.precio - (product.precio * product.promo / 100)) >= this.minPrice && (product.precio - (product.precio * product.promo / 100)) <= this.maxPrice));
    }

    if (this.minPrice >= 0 && this.maxPrice == 99999999) {
      this.productoService.productos = this.productList.filter(product => product.precio >= this.minPrice);
    }

    if (this.maxPrice <= 99999999 && this.minPrice == 0) {
      this.productoService.productos = this.productList.filter(product => product.precio <= this.maxPrice);
    }
  }

  clearFilters() {
      this.productoService.productos = this.productList.sort();
      this.minPrice = 0;
      this.maxPrice = 99999999;
  }

}
