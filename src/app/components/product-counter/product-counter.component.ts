import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.css']
})
export class ProductCounterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() price: string;
  @Output() updatePriceEvent = new EventEmitter<number>();
  @Output() updateAmountEvent = new EventEmitter<number>();

  amount = 1;

  add() {
    this.amount =this.amount + 1;
    this.updateAmountByInput(this.amount);
    this.updatePrice(this.calculatePrice(this.amount, this.price));
  }

  subtract() {
    if (Number(this.amount) > 1)
    {
      this.amount= this.amount - 1;
      this.updatePrice(this.calculatePrice(this.amount, this.price));
      
    }
  }

  calculatePrice(amount: any, price: any) {
    debugger;
    return (Number(amount)*Number(price));
    debugger;
  }
  
  updatePrice(value: number) {
    this.updatePriceEvent.emit(value);
  }

  updateAmountByInput(event: any) {
    const inputValue = Number(event);
    if (!isNaN(inputValue) && inputValue >= 0) {
      this.amount = inputValue;
      this.updateAmount(inputValue);
    }
  }
  updateAmount(value: number) {
    this.updateAmountEvent.emit(value);
  }
  Asig(){
    return this.amount;
  }
}
