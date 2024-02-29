import { Component, OnInit } from '@angular/core';
import { StoreLocatorService } from 'src/app/services/store-locator/store-locator.service';


@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.css']
})
export class StoreLocatorComponent implements OnInit {

  constructor( public storeLocatorService: StoreLocatorService) { }
  
  ngOnInit(): void {
    this.getSucursal();
  }

  getSucursal() {
    this.storeLocatorService.getAllStorelocator().subscribe(
      (res) => {
        this.storeLocatorService.storeLocators = res;
      },
      err => console.log(err)
    )
  }

}
