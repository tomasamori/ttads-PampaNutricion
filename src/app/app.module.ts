import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ListComponent } from './components/list/list.component';
import {RouterLinkActive, RouterOutlet} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { CrudPageComponent } from './components/crud-page/crud-page.component';
import { CrudProductsComponent } from './components/crud-products/crud-products.component';
import { CrudTipoMascotaComponent } from './components/crud-tipoMascota/crud-tipoMascota.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudLocalidadComponent } from './components/crud-localidad/crud-localidad.component';
import { CrudSucursalComponent } from './components/crud-sucursal/crud-sucursal.component';
import { CrudProveedorComponent } from './components/crud-proveedor/crud-proveedor.component';
import { CrudCardComponent } from './components/crud-card/crud-card.component';
import { ProductCounterComponent } from './components/product-counter/product-counter.component';
import { ListFilterPipe } from './pipes/list-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { StoreLocatorComponent } from './components/store-locator/store-locator.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreLocatorCardComponent } from './components/store-locator-card/store-locator-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductCardComponent,
    CrudTipoMascotaComponent,
    CrudUsuarioComponent,
    ListComponent,
    HomeComponent,
    CrudPageComponent,
    CrudProductsComponent,
    CrudProveedorComponent,
    CrudSucursalComponent,
    CrudCardComponent, 
    ProductCounterComponent,
    CrudLocalidadComponent,
    ListFilterPipe,
    FooterComponent,
    StoreLocatorComponent,
    StoreLocatorCardComponent,
    CartComponent,
    ResetPasswordComponent,
    OrderManagerComponent
  ],
  imports: [
    BrowserModule,
    RouterLinkActive,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    NgxPaginationModule, 
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-center',
        maxOpened:3,
        autoDismiss: true
      }
    ),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
