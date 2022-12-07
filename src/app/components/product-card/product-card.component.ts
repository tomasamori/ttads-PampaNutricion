import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor() {}


  ngOnInit(): void {
  }
  @Input() brand: string;
  @Input() name: string;
  @Input() description: string;
  @Input() petName: string;
  @Input() petAge: string;
  @Input() petSize: string;
  @Input() price: string;
  @Input() imgUrl: string;
  @Input() discount: string;

  calculatePrice(price:number, discount:number) {
    return (price - (price * discount / 100));
  }
}
