import { Component, OnInit } from "@angular/core";
import {ProductoService} from "../../services/producto/producto.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

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
