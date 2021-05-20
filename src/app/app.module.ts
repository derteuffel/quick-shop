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

import { AdministrationComponent } from './admin/administration/administration.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddProductComponent } from './admin/product/add-product/add-product.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { DetailProductComponent } from './eco/product/detail-product/detail-product.component';
import { AdministrationDetailProductComponent } from './admin/product/administration-detail-product/administration-detail-product.component';
import { AdministrationUpdateProductComponent } from './admin/product/administration-update-product/administration-update-product.component';
import { CommandeComponent } from './admin/commande/commande/commande.component';
import { BoutiqueComponent } from './admin/boutique/boutique/boutique.component';
import { AddBoutiqueComponent } from './admin/boutique/add-boutique/add-boutique.component';
import { BoutiqueDetailComponent } from './admin/boutique/boutique-detail/boutique-detail.component';
import { UpdateBoutiqueComponent } from './admin/boutique/update-boutique/update-boutique.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SellerAddBoutiqueComponent } from './seller/boutique/seller-add-boutique/seller-add-boutique.component';
import { SellerAddProductComponent } from './seller/product/seller-add-product/seller-add-product.component';
import { SellerBoutiqueDetailComponent } from './seller/boutique/seller-boutique-detail/seller-boutique-detail.component';
import { SellerBoutiqueListComponent } from './seller/boutique/selle-boutique-list/seller-boutique-list.component';
import { SellerCommandeComponent } from './seller/commande/seller-commande/seller-commande.component';
import { SellerDetailProductComponent } from './seller/product/seller-detail-product/seller-detail-product.component';
import { SellerHeaderComponent } from './seller/seller-header/seller-header.component';
import { SellerUpdateBoutiqueComponent } from './seller/boutique/seller-update-boutique/seller-update-boutique.component';
import { SellerUpdateProductComponent } from './seller/product/seller-update-product/seller-update-product.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginSuccessComponent } from './auth/login-success/login-success.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ToastrModule} from 'ngx-toastr';
import {ToastModule} from 'primeng/toast';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CoachingComponent } from './coachings/coaching/coaching.component';
import { CoachingSessionComponent } from './coachings/coaching-session/coaching-session.component';
import {RouterModule} from '@angular/router';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import {CardModule} from 'primeng/card';
import { ProductComponent } from './admin/boutique/product/product.component';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AdministrationProductsComponent } from './admin/product/administration-products/administration-products.component';
import {SidebarModule} from "primeng/sidebar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, SharedModule} from "primeng/api";



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
    BoutiqueComponent,
    AddBoutiqueComponent,
    BoutiqueDetailComponent,
    UpdateBoutiqueComponent,
    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    LoginSuccessComponent,
    CoachingComponent,
    CoachingSessionComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    ProductComponent,
    AdministrationProductsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    TableModule,
    ButtonModule,
    MessagesModule,
    NgbModule,
    CardModule,
    ToastModule,
    IconModule,
    DialogModule,
    ConfirmDialogModule,
    SharedModule,
    SidebarModule,
    ModalModule.forRoot(),
    IconSetModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
  ],
  providers: [IconSetService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
