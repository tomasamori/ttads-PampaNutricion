import { Component, OnInit } from '@angular/core';
import { StoreLocatorService } from 'src/app/services/store-locator/store-locator.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

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
