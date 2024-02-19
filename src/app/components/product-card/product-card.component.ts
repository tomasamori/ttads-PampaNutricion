import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(private cart: CartService) { }


  ngOnInit(): void {
  }

  @Input() _id: string;
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

  finalPrice = 0;
  amount=1;
  show : boolean = false;
  MsjNot : string ='';
  product:Producto={
    _id:'',
    marca:'',
    descripcion:'',
    nombre:'',
    peso:0,
    precio:0,
    promo:0,
    tipoMascota:{_id:'', tamanoRaza:'',edad:'',nombre:''},
    imgUrl:'',
    amount:1
  }
  
  calculatePrice(price:number, discount:number) {
    return (price - (price * discount / 100));
  }

  updatePrice(newPrice: number) {
    this.finalPrice = newPrice;
  }

  updateAmount(newAmount: number) {
    this.amount = newAmount;
  }

  completeProd() {
    this.product._id = this._id;
    this.product.descripcion = this.description;
    this.product.marca = this.brand;
    this.product.nombre = this.name;
    this.product.peso = Number(this.weight);
    this.product.precio = Number(this.price);
    this.product.promo = Number(this.discount);
    this.product.tipoMascota.tamanoRaza = this.petSize;
    this.product.tipoMascota.edad = this.petAge;
    this.product.tipoMascota.nombre = this.petName;
    this.product.imgUrl = this.imgUrl;
    this.product.amount = this.amount;
  }

  addProdCart() {
    this.completeProd();
    this.cart.addCart(this.product);

    this.show = true;
    this.MsjNot = 'Se agregó correctamente al carrito.'
    setTimeout(()=>{
      this.MsjNot='';
      this.show = false;
    },3000);
  }
}
