import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListadoComponent } from "./components/listado/listado.component";
import {HomeComponent} from "./components/home/home.component";

// routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ListadoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
