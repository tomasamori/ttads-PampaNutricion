import { Component, Input ,OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {

  constructor(private cart:CartService,private toastr: ToastrService) { 
    let p = Number(this.price).toFixed(2)
  }

  ngOnInit(): void {
   this.map();
  }
  @Input() brand: string;
  @Input() name: string;
  @Input() description: string;
  @Input() weight: string;
  @Input() petName: string;
  @Input() petAge: string;
  @Input() petSize: string;
  @Input() price: string;
  @Input() imgUrl: string;
  @Input() discount: string;
  @Input() id: string;
  @Input() amount:string;
  finalPrice=0;
  product:Producto={
    _id:'',
    marca:'',
    descripcion:'',
    nombre:'',
    peso:0,
    precio:0,
    promo:0,
    tipoMascota:{_id:'',nombre: '', tamanoRaza: '', edad: ''},
    imgUrl:'',
    amount:1
  }

  calculatePrice(price:number, discount:number) {
    return Number((price - (price * discount / 100)).toFixed(2));
  }

  updatePrice(newPrice: number) {
    this.finalPrice = newPrice;
  }

  updateAmount(newAmount: number) {
    //this.finalAmount = newAmount;
    //this.producto.amount = this.finalAmount;
  }
  subtract(){

    if ((this.product.amount-1)>0){
      this.product.amount= this.product.amount-1
    }
    this.cart.updateProd(this.product)
  }
  add(){
    if (this.product.amount>0){
      this.product.amount= this.product.amount+1;
    }
    this.cart.updateProd(this.product)
  }
  delete(){
    this.cart.deleteProd(this.product)
    this.toastr.error('Se ha eliminado el producto.')
  }
  map(){
   this.product._id= this.id.toString();
   this.product.descripcion = this.description;
   this.product.marca = this.brand;
   this.product.nombre = this.name;
   this.product.peso = Number(this.weight);
   this.product.precio = Number(this.price);
   this.product.promo = Number(this.discount);
   this.product.tipoMascota.tamanoRaza = this.petSize;
   this.product.tipoMascota.edad = this.petAge;
   this.product.tipoMascota.nombre = this.petName;
   this.product.amount=Number(this.amount)
   this.product.imgUrl = this.imgUrl;
  }
  calculateFinalPrice(){
    return (this.finalPrice = this.calculatePrice(this.product.precio,this.product.promo)* this.product.amount).toFixed(2);
  }
}