import { Component,EventEmitter,Input,Output ,OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.css']
})
export class CartCounterComponent implements OnInit {

  constructor(cart: CartService) { }

  ngOnInit(): void {
  }

  @Input() price: string;
  @Output() updatePriceEvent = new EventEmitter<number>();
  @Output() updateAmountEvent = new EventEmitter<number>();
  @Input() amount1:string;
  amount=1;

  add() {
    this.amount = this.amount+ 1;
    this.updatePrice(this.calculatePrice(this.amount, this.price));
    this.updateAmount(this.amount);
  }

  subtract() {
    if (Number(this.amount) > 1)
    {
      this.amount = this.amount - 1;
      this.updatePrice(this.calculatePrice(this.amount, this.price));
      this.updateAmount(this.amount);
    }
  }

  calculatePrice(amount: any, price: any) {
    return (Number(amount)*Number(price));
  }

  updatePrice(value: number) {
    this.updatePriceEvent.emit(value);
  }

  updateAmount(value: number) {
    this.updateAmountEvent.emit(value);
  }
}