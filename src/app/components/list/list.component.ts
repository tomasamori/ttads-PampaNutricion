import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../services/producto/producto.service";
import { Router } from "@angular/router";
import { Producto } from "src/app/models/producto";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  p: number = 1;
  
  constructor(public productoService: ProductoService, private router: Router) { }

  productList: Producto[] = [];
  filterProduct = '';
  minPrice?: number;
  maxPrice?: number;
  TpoObj:string ='2';
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
        return ((b.precio - (b.precio * b.promo / 100)) - (a.precio - (a.precio * a.promo / 100)));
      });
    }

    if (price == 'Menor') {
      this.productoService.productos = this.productoService.productos.sort((a, b) => {
        return ((a.precio - (a.precio * a.promo / 100)) - (b.precio - (b.precio * b.promo / 100)));
      });
    }
  }

  filterProductsByPriceRange() {
    if ((this.minPrice || 0) >= 0 && (this.maxPrice || 99999999) <= 99999999) {
      this.productoService.productos = this.productList.filter(product => {
        const discountedPrice = product.promo > 0 ? product.precio - (product.precio * product.promo / 100) : product.precio;
        return discountedPrice >= (this.minPrice || 0) && discountedPrice <= (this.maxPrice || 99999999);
      });
    } else {
      // Reset filter if invalid price range is provided
      this.productoService.productos = this.productList;
    }
  }


  clearFilters() {
    this.productoService.productos = this.productList.sort();
    delete this.minPrice;
    delete this.maxPrice;
  }

}
