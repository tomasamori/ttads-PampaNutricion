import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { HomeComponent } from "./components/home/home.component";
import { CrudPageComponent } from "./components/crud-page/crud-page.component";
import { CrudProductsComponent } from './components/crud-products/crud-products.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { CrudTipoMascotaComponent } from './components/crud-tipoMascota/crud-tipoMascota.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudLocalidadComponent } from './components/crud-localidad/crud-localidad.component';
import { CrudSucursalComponent } from './components/crud-sucursal/crud-sucursal.component';
import { CrudProveedorComponent } from './components/crud-proveedor/crud-proveedor.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';

// routes
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ListComponent},
  {path: 'crud', component: CrudPageComponent},
  {path: 'crud-products', component: CrudProductsComponent},
  {path: 'crud-typeOfPets', component: CrudTipoMascotaComponent},
  {path: 'crud-users', component: CrudUsuarioComponent},
  {path: 'crud-Storelocator', component: CrudSucursalComponent},
  {path: 'crud-proveedor', component: CrudProveedorComponent},
  {path: 'crud-locations', component: CrudLocalidadComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path:'cart', component:CartComponent},
  {path: 'crud-page', component: CrudPageComponent},
  {path: 'reset-password/:token', component: ResetPasswordComponent },
  {path: 'order-manager', component: OrderManagerComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
