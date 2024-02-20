import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-crud-card',
  templateUrl: './crud-card.component.html',
  styleUrls: ['./crud-card.component.css']
})
export class CrudCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() name: string;
  @Input() link: string;

}
