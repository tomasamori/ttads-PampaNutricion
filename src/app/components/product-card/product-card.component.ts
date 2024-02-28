import { Component, Input, OnInit,Output,EventEmitter  } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CartService } from 'src/app/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(private cart: CartService,private toastr: ToastrService) { }

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
  @Input() amount1: string;
  @Input() TpoObj: string;
  @Output() counterChanged: EventEmitter<any> = new EventEmitter<any>();


  ngOnInit(): void {
    if (this.TpoObj==='1'){
      this.amount = Number(this.amount1)
      this.updateAmount(this.amount);
    }
    if (this.TpoObj==='2'){
      this.amount = 1
    }
    }
  TpoObj1:number;
  finalPrice = 0;
  amount:number;
  
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
    tipoMascota:{_id:'',nombre: '', tamanoRaza: '', edad: ''},
    imgUrl:'',
    amount:1
  }
  
  calculatePrice(price:number, discount:number) {
    return Number((price - (price * discount / 100)).toFixed(2));
  }
  updatePrice(event: any) {
    this.finalPrice = Number(event);//newPrice;
  }

  updateAmount(newAmount: number) {
    this.amount = newAmount;
    this.completeProd();
    this.cart.updateProd(this.product);
  }

  completeProd() {
    this.product._id= this._id;
    this.product._id = String(this.product._id);
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

  addProdCart() {
    this.completeProd();
    this.cart.addCart(this.product);
    this.toastr.success('Se agregó correctamente al carrito.')
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
    this.completeProd();
    this.cart.deleteProd(this.product)
    this.toastr.error('Se ha eliminado el producto.')
  }
  calculateFinalPrice(){
    return (this.finalPrice = this.calculatePrice(this.product.precio,this.product.promo)* this.product.amount).toFixed(2);
  }
  TipOBJ(){
    return this.TpoObj
  }
  onCounterChange() {
    this.counterChanged.emit();
  }

}
