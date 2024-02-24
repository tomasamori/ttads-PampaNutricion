import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { HomeComponent } from "./components/home/home.component";
import { CrudPageComponent } from "./components/crud-page/crud-page.component";
import { CrudProductsComponent } from './components/crud-products/crud-products.component';
import { StoreLocatorComponent } from './components/store-locator/store-locator.component';
import { CartComponent } from './components/cart/cart.component';
import { CrudTipoMascotaComponent } from './components/crud-tipoMascota/crud-tipoMascota.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudLocalidadComponent } from './components/crud-localidad/crud-localidad.component';
// routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ListComponent},
  {path: 'crud', component: CrudPageComponent},
  {path: 'crud-products', component: CrudProductsComponent},
  {path: 'crud-typeOfPets', component: CrudTipoMascotaComponent},
  {path: 'crud-users', component: CrudUsuarioComponent},
  {path: 'crud-locations', component: CrudLocalidadComponent},
  {path: 'store-locator', component: StoreLocatorComponent},
  {path:'cart', component:CartComponent},
  {path: 'crud-page', component: CrudPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
