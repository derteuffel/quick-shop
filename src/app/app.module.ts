import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './ecommerce/ecommerce.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { ProductsComponent } from './ecommerce/products/products.component';
import { ShoppingCartComponent } from './ecommerce/shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdministrationComponent } from './administration/administration.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './ecommerce/add-product/add-product.component';
import { AdminHeaderComponent } from './administration/admin-header/admin-header.component';
import { DetailProductComponent } from './ecommerce/detail-product/detail-product.component';
import { AdministrationDetailProductComponent } from './administration/administration-detail-product/administration-detail-product.component';
import { AdministrationUpdateProductComponent } from './administration/administration-update-product/administration-update-product.component';
import { CommandeComponent } from './administration/commande/commande.component';
import { WomenProductsComponent } from './ecommerce/women-products/women-products.component';
import { MenProductsComponent } from './ecommerce/men-products/men-products.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { AddBoutiqueComponent } from './add-boutique/add-boutique.component';
import { BoutiqueDetailComponent } from './boutique-detail/boutique-detail.component';
import { UpdateBoutiqueComponent } from './update-boutique/update-boutique.component';


@NgModule({
  declarations: [
    AppComponent,
    EcommerceComponent,
    OrdersComponent,
    ProductsComponent,
    ShoppingCartComponent,
    HeaderComponent,
    FooterComponent,
    AdministrationComponent,
    AddProductComponent,
    AdminHeaderComponent,
    DetailProductComponent,
    AdministrationDetailProductComponent,
    AdministrationUpdateProductComponent,
    CommandeComponent,
    WomenProductsComponent,
    MenProductsComponent,
    BoutiqueComponent,
    AddBoutiqueComponent,
    BoutiqueDetailComponent,
    UpdateBoutiqueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
