import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import {Producto} from "../../models/producto";
import { Pedido } from 'src/app/models/pedido';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import {Observable} from "rxjs";



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
      usuario: '',
      productos: [],
      cantidad : [],
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

  ConvertDataForTicket(){

    const arrayConvertido: { [key: string]: string; }[] = this.products.map(producto => {

      const objetoConvertido: { [key: string]: string; } = {};
      
      objetoConvertido['Nombre'] = this.truncarString(producto.nombre.trim(),70);
      objetoConvertido['Cantidad'] = String(producto.amount).trim();
      objetoConvertido['Precio'] = '$'+String(producto.precio.toFixed(2)).trim();
      objetoConvertido['Subtotal'] = '$'+String((producto.precio*producto.amount).toFixed(2)).trim();
      objetoConvertido['IVA'] = '$'+String(((producto.precio*producto.amount*1.21)-(producto.precio*producto.amount)).toFixed(2)).trim();
      objetoConvertido['Precio final'] = '$'+String((producto.precio*producto.amount*1.21).toFixed(2)).trim();
      return objetoConvertido;
    });
      //debugger;
      return arrayConvertido;
    }  
    truncarString(str: string, maxLength: number): string {
      if (str.length <= maxLength) {
          return str; // Si la longitud del string es menor o igual al maxLength, no se necesita truncar
      } else {
          return str.substring(0, maxLength); // Si la longitud del string es mayor que maxLength, se trunca el string hasta maxLength
      }
  }
    getAllPedido() {
      return this.http.get<Pedido>(this.URL_API);
    }
  
    createPedido(pedido: Pedido){
      //this.MapProdToPed(1);
      return this.http.post<Pedido>(this.URL_API, pedido);
    }
  
    updatePedido(pedido : Pedido){
      return this.http.put(`${this.URL_API}/${pedido._id}`, pedido);
    }
  
    deletePedido(_id:string){
      return this.http.delete(`${this.URL_API}/${_id}`)
    }
  
    getRecordById(_id: String): Observable<Pedido>{
      return this.http.get<Pedido>(`${this.URL_API}/${_id}`);
    }

    

  }