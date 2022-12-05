import { Component, OnInit } from "@angular/core";
import {ProductoService} from "../../services/producto/producto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public productoService: ProductoService, private router:Router) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getAllProducto().subscribe(
      data => {
        this.productoService.producto = data;
      },
      err => console.log(err)
    )
  };

}
