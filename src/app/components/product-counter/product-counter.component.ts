import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-product-counter',
  templateUrl: './product-counter.component.html',
  styleUrls: ['./product-counter.component.css']
})

export class ProductCounterComponent implements OnInit {


  @Input() price: string;
  @Output() updatePriceEvent = new EventEmitter<number>();
  @Output() updateAmountEvent = new EventEmitter<number>();
  @Input() amount1:string;
  @Input() TpoObj :string;
  @Output() counterChanged: EventEmitter<any> = new EventEmitter<any>();
  amount:number;

  constructor() { }
  ngOnInit(): void {

   if (this.TpoObj==='1'){
    this.amount = Number(this.amount1)
   }
   if (this.TpoObj==='2'){
    this.amount = 1
   }
  }

  add() {
    this.amount = Number(this.amount) + 1;
    this.updatePrice(Number(this.calculatePrice(this.amount, this.price)));
    this.updateAmount(this.amount);
  }

  subtract() {
    if (Number(this.amount) > 1) {
      this.amount = Number(this.amount) - 1;
      this.updatePrice(Number(this.calculatePrice(this.amount, this.price)));
      this.updateAmount(this.amount);
    }
  }

  calculatePrice(amount: number, price: any) {
    return (amount*Number(price)).toFixed(2);
  }

  updatePrice(value: number) {
    this.updatePriceEvent.emit(value);
  }

  updateAmountByInput(event: any) {
    let inputValue = Number(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      this.amount = inputValue;
      this.updateAmount(inputValue);
    }
  }

  updateAmount(value: number) {
    this.updateAmountEvent.emit(value);
    this.onChange();
  }

  onChange() {
    this.counterChanged.emit();
  }
}