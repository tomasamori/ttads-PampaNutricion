import {Component, Input, OnInit} from '@angular/core';
import { Storelocator } from 'src/app/models/store-locator';
import { StoreLocatorService } from 'src/app/services/store-locator/store-locator.service';

@Component({
  selector: 'app-store-locator-card',
  templateUrl: './store-locator-card.component.html',
  styleUrls: ['./store-locator-card.component.css']
})
export class StoreLocatorCardComponent implements OnInit {

  constructor(private store:StoreLocatorService) { }

  ngOnInit(): void {
    this.completar()
  }
  @Input() imgUrl: string;
  @Input() nombre: string;
  @Input() direccion: string;
  /*@Input() codPostal: string;
  @Input() nombre2: string;*/
  storelocator:Storelocator={
    nombre: '',
    direccion: '',
    foto: '',
    localidad:{codPostal: '', nombre: ''}
  }
  completar(){
    this.storelocator.foto = this.imgUrl;
    this.storelocator.nombre = this.nombre;
    this.storelocator.direccion = this.direccion;
    /*this.storelocator.localidad.codPostal = this.codPostal;
    this.storelocator.localidad.nombre = this.nombre2;*/

  }


}
