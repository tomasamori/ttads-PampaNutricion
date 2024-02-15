import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(protected cartService:CartService,private router:Router) { }
  Products:Producto[];

  ngOnInit(): void {
    this.getAllProd();

  }
  getAllProd(){
    return this.cartService.getAllCarrito();
  }
  CantidadAritulos(){
    let TotalArt = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      TotalArt = TotalArt +  produc.amount
    });
  return TotalArt;
  }


  total(){
    let a = 0;
    this.cartService.getAllCarrito().forEach(produc => {
      if (produc.promo <=0){
        a+=produc.precio*produc.amount;
      }
      if(produc.promo>0){
        a+=(produc.precio - (produc.precio  * produc.promo / 100))*produc.amount;
      }
    });
  return a;
  }
  List(){
    this.router.navigate(['products'])
  }
  Pay(){
    this.cartService.vaciarCarrito()
    this.router.navigate(['home'])
    //conts pdf

  }

}