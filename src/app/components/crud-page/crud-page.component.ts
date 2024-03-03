import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {    
    if (localStorage.getItem('rol') === 'admin') {

  }
  else {
    this.router.navigate(['/home']);
  }



  }

}
