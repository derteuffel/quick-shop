import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './eco/ecommerce/ecommerce.component';
import { OrdersComponent } from './eco/orders/orders.component';
import { ProductsComponent } from './eco/product/products/products.component';
import { ShoppingCartComponent } from './eco/shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdministrationComponent } from './admin/administration/administration.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { DetailProductComponent } from './eco/product/detail-product/detail-product.component';
import { AdministrationDetailProductComponent } from './admin/product/administration-detail-product/administration-detail-product.component';
import { AdministrationUpdateProductComponent } from './admin/product/administration-update-product/administration-update-product.component';
import { CommandeComponent } from './admin/commande/commande/commande.component';
import { WomenProductsComponent } from './eco/product/women-products/women-products.component';
import { MenProductsComponent } from './eco/product/men-products/men-products.component';
import { BoutiqueComponent } from './admin/boutique/boutique/boutique.component';
import { AddBoutiqueComponent } from './admin/boutique/add-boutique/add-boutique.component';
import { BoutiqueDetailComponent } from './admin/boutique/boutique-detail/boutique-detail.component';
import { UpdateBoutiqueComponent } from './admin/boutique/update-boutique/update-boutique.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthService } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';
import { Parametre } from './models/parametre';
import { SellerAddBoutiqueComponent } from './seller/boutique/seller-add-boutique/seller-add-boutique.component';
import { SellerAddProductComponent } from './seller/product/seller-add-product/seller-add-product.component';
import { SellerBoutiqueDetailComponent } from './seller/boutique/seller-boutique-detail/seller-boutique-detail.component';
import { SellerBoutiqueListComponent } from './seller/boutique/selle-boutique-list/seller-boutique-list.component';
import { SellerCommandeComponent } from './seller/commande/seller-commande/seller-commande.component';
import { SellerDetailProductComponent } from './seller/product/seller-detail-product/seller-detail-product.component';
import { SellerHeaderComponent } from './seller/seller-header/seller-header.component';
import { SellerUpdateBoutiqueComponent } from './seller/boutique/seller-update-boutique/seller-update-boutique.component';
import { SellerUpdateProductComponent } from './seller/product/seller-update-product/seller-update-product.component';


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
    SellerAddBoutiqueComponent,
    SellerAddProductComponent,
    SellerBoutiqueDetailComponent,
    SellerBoutiqueListComponent,
    SellerCommandeComponent,
    SellerDetailProductComponent,
    SellerHeaderComponent,
    SellerUpdateBoutiqueComponent,
    SellerUpdateProductComponent,
    CommandeComponent,
    WomenProductsComponent,
    MenProductsComponent,
    BoutiqueComponent,
    AddBoutiqueComponent,
    BoutiqueDetailComponent,
    UpdateBoutiqueComponent,
    LoginComponent,
    RegisterComponent
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
  providers: [ Parametre,
  {provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
