import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import {Producto} from "../../models/producto";
import { Pedido } from 'src/app/models/pedido';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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


    getAllPedido() {
      return this.http.get<Pedido>(this.URL_API);
    }
  
    createPedido(pedido: Pedido){
     const httpOptions = {
        headers: new HttpHeaders({
          "x-access-token": localStorage.getItem('token')
        })
      };
      return this.http.post<Pedido>(this.URL_API, pedido,httpOptions);
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

    loadImageAsBase64(imageUrl: string): Promise<string> {
      return this.http.get(imageUrl, { responseType: 'blob' })
        .toPromise()
        .then(blob => this.blobToBase64(blob));
    }
  
    private blobToBase64(blob: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

  }