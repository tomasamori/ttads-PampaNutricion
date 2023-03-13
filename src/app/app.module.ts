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
import { CrudCardComponent } from './components/crud-card/crud-card.component';
import { ProductCounterComponent } from './components/product-counter/product-counter.component';
import { ListFilterPipe } from './pipes/list-filter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductCardComponent,
    ListComponent,
    HomeComponent,
    CrudPageComponent,
    CrudProductsComponent,
    CrudCardComponent, 
    ProductCounterComponent,
    ListFilterPipe,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterLinkActive,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
