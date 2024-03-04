import { Injectable } from '@angular/core';
import {Producto} from "../../models/producto";
import { Pedido } from 'src/app/models/pedido';
import { HttpClient} from '@angular/common/http';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  //
  public products:Producto[]=[];
  public pedido : Pedido = null;
  URL_API = environment.URL_PEDIDO;

  constructor(private http: HttpClient) {}

  selectedProduct: Producto = {
    nombre: '',
    marca: '',
    descripcion:'',
    peso:0,
    imgUrl:'',
    tipoMascota: {_id:'', nombre:'', tamanoRaza: '', edad: ''},
    precio: 0,
    promo:0,
    amount:0
    };

    selectedPedido: Pedido = {
      _id: '',
      usuario: {_id: '', usuario: '', password: '', email: '', rol: {_id: '', name: ''}, cuil: '', nombre: '', fechaNacimiento: new Date(), direccion: '', telefono: ''},
      items: [{producto: {_id: '', marca: '', nombre: '', descripcion: '', peso: 0, imgUrl: '', tipoMascota: {_id: '', nombre: '', tamanoRaza: '', edad: ''}, precio: 0, promo: 0, amount: 0}, cantidad: 0}],
      subtotal: 0,
      total:0,
      estado:'',
      nroPedido: 0
    };

   

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
  updateProd(productsDetail: Producto) {
    if (localStorage.getItem('products') !== null) {
      this.products = JSON.parse(localStorage.getItem('products')!);
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i]._id === productsDetail._id) {
          this.products[i] = productsDetail;
          localStorage.setItem('products', JSON.stringify(this.products));
          break;
        }
      }
    }
  }


  vaciarCarrito() {
    this.products=[];
    localStorage.removeItem('products');
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