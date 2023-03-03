import { Component, Input, OnInit } from '@angular/core';

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

  amount = 1;

  add() {
    this.amount = this.amount + 1
  }

  subtract() {
    if (this.amount > 1)
    {
      this.amount = this.amount - 1
    }
  }

  calculatePrice(amount: any, price: any)
  {
    return (Number(amount)*Number(price));
  }
}
