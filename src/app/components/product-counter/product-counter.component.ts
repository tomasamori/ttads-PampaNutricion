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

  amount = 1;

  add() {
    this.amount = Number(this.amount) + 1;
    this.updatePrice(this.calculatePrice(this.amount, this.price));
  }

  subtract() {
    if (this.amount > 1)
    {
      this.amount = Number(this.amount) - 1;
      this.updatePrice(this.calculatePrice(this.amount, this.price));
    }
  }

  calculatePrice(amount: any, price: any) {
    return (Number(amount)*Number(price));
  }
  
  updatePrice(value: number) {
    this.updatePriceEvent.emit(value);
  }

  updateAmountByInput(event: any) {
    if (event.target.value >= 0) {
      this.amount = event.target.value;
    }
  }
}
