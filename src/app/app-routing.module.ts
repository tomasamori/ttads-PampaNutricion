import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { HomeComponent } from "./components/home/home.component";
import { CrudPageComponent } from "./components/crud-page/crud-page.component";
import { CrudProductsComponent } from './components/crud-products/crud-products.component';
import { LoginComponent } from './components/login/login.component';

// routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ListComponent},
  {path: 'crud', component: CrudPageComponent},
  {path: 'crud-products', component: CrudProductsComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
