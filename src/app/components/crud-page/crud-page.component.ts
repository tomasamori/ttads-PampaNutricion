import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.css']
})
export class CrudPageComponent implements OnInit {
isAdmin:Boolean=true;
isEmpleado:boolean=true;
  constructor(private router: Router) { }

  ngOnInit(): void {    
    if (localStorage.getItem('rol') === 'admin'|| localStorage.getItem('rol') === 'empleado') {
      debugger;
      if(localStorage.getItem('rol') === 'admin'){
          this.isAdmin = true;
          this.isEmpleado=false;
      }else{
        this.isAdmin = false;
        this.isEmpleado=true;
      }

  }
  else {
    this.router.navigate(['/home']);
  }



  }

}
