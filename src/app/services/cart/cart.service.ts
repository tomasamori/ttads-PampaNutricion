import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import {Producto} from "../../models/producto";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  //
  public products:Producto[]=[];
  constructor() {}

  addCart(productoDetalle: Producto) {
    this.products = JSON.parse(localStorage.getItem('products')!);
    if(localStorage.getItem('products')===null){
      this.products = []
      this.products.push(productoDetalle)
      localStorage.setItem('products',JSON.stringify(this.products));
    }else{
      if(this.validar(productoDetalle)==0){
      this.updateProd(productoDetalle);
    }
      else{
          this.products.push(productoDetalle);
          localStorage.setItem('products',JSON.stringify(this.products));
      }
    }
  }
  getAllCarrito(){
    if(localStorage.getItem('products')===null){
      this.products = []
      return this.products;
    }else{
      this.products=JSON.parse(localStorage.getItem('products')!);
      return this.products;
    }
  }
  deleteProd(productsDetail:Producto){
    this.products= JSON.parse(localStorage.getItem('products')!);
    for (var i= 0; i < this.products.length;i++){
      if (this.products[i]._id===productsDetail._id){
        this.products.splice(i,1);
        localStorage.setItem('products',JSON.stringify(this.products));
      }
    }  
  }
  updateProd(productsDetail:Producto){
    this.products = JSON.parse(localStorage.getItem('products')!);
    this.products.forEach((prod,i)=>{
      if(this.products[i]._id === productsDetail._id){
        this.products[i] = productsDetail;
        localStorage.setItem('products', JSON.stringify(this.products));
      }
    })

  }


  vaciarCarrito() {
    this.products=[];
    localStorage.clear();
  }
  validar(productoDetalle: Producto) {
    this.products=JSON.parse(localStorage.getItem('products')!);
    let estado = 1;
    for (var i= 0; i < this.products.length;i++){
      if (this.products[i]._id===productoDetalle._id){
        estado = 0;
      }
    }  
  return estado
  }
}