import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommerceComponent } from './eco/ecommerce/ecommerce.component';
import { ProductsComponent } from './eco/product/products/products.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AdministrationComponent } from './admin/administration/administration.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { DetailProductComponent } from './eco/product/detail-product/detail-product.component';
import { CommandeComponent } from './admin/commande/commande/commande.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {ToastrModule} from 'ngx-toastr';
import {ToastModule} from 'primeng/toast';
import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import {CardModule} from "primeng/card";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, SharedModule} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {ModalModule} from "ngx-bootstrap/modal";
import { SingupComponent } from './auth/singup/singup.component';
import { TestComponent } from './test/test/test.component';
import {AdminFooterComponent} from "./admin/admin-footer/admin-footer.component";
import {AdminSidebarComponent} from "./admin/admin-sidebar/admin-sidebar.component";
import { ArticlesComponent } from './eco/articles/articles.component';
import { CoachingsComponent } from './eco/coachings/coachings.component';
import { CoachingDetailComponent } from './eco/coachings/coaching-detail/coaching-detail.component';
import { LoansRequestComponent } from './loans/loans-request/loans-request.component';
import { MicrofinanceDetailComponent } from './eco/microfinance/microfinance-detail/microfinance-detail.component';
import { MicrofinanceComponent } from './eco/microfinance/microfinance.component';
import { HeaderProduitComponent } from './header/header-produit/header-produit.component';
import { HeaderServiceComponent } from './header/header-service/header-service.component';
import { HeaderFinanceComponent } from './header/header-finance/header-finance.component';
import { ArticlesSearchComponent } from './eco/articles-search/articles-search.component';
import { CoachingsSearchComponent } from './eco/coachings-search/coachings-search.component';
import { HomeComponent } from './auth/home/home.component';
import { SingupTrainnerComponent } from './auth/singup-trainner/singup-trainner.component';
import { SingupClientComponent } from './auth/singup-client/singup-client.component';
import { SingupInvesterComponent } from './auth/singup-invester/singup-invester.component';
import { SingupLoansComponent } from './auth/singup-loans/singup-loans.component';
import { AdminRootHome } from './admin/admin-root-home/admin-root-home.component';
import { AdminRootProductComponent } from './admin/admin-root-product/admin-root-product.component';
import { AdminRootCoachingsComponent } from './admin/admin-root-coachings/coaching/admin-root-coachings.component';
import { AdminRootCoachingComponent } from './admin/admin-root-coaching/admin-root-coaching.component';
import { AdminLoansInputsComponent } from './admin/loans/admin-loans-inputs/admin-loans-inputs.component';
import { AdminLoansRequestComponent } from './admin/loans/admin-loans-requests/admin-loans-requests.component';
import { ConfigurationsComponent } from './admin/configurations/configurations.component';
import { AdminAccountComponent } from './admin/configurations/admin-account/admin-account.component';
import { MicrofinanceSearchComponent } from './eco/microfinance-search/microfinance-search.component';
import { CommandeEntreprenerComponent } from './admin/commande/commande-entreprener/commande-entreprener.component';
import { CommandeClientComponent } from './admin/commande/commande-client/commande-client.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { ActivationComponent } from './auth/activation/activation.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { TemoignageComponent } from './temoignage/temoignage.component';
import { LoansInputsComponent } from './loans/loans-inputs/loans-inputs.component';
import { InvestComponent } from './eco/invest/invest.component';
import { SocialRedirectComponent } from './social-redirect/social-redirect.component';
import { LoansInputsDetailsComponent } from './loans/loans-inputs-details/loans-inputs-details.component';
import { LoansInputsViewComponent } from './loans/loans-inputs-view/loans-inputs-view.component';




@NgModule({
  declarations: [
    AppComponent,
    EcommerceComponent,
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    AdministrationComponent,
    AdminHeaderComponent,
    DetailProductComponent,
    CommandeComponent,

    LoginComponent,
    RegisterComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    RegisterSuccessComponent,
    AdminNavbarComponent,
    AdminLoansInputsComponent,
    AdminLoansRequestComponent,
    SingupTrainnerComponent,
    SingupComponent,
    SingupClientComponent,
    SingupInvesterComponent,
    TestComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    ArticlesComponent,
    CoachingsComponent,
    CoachingsSearchComponent,
    CoachingDetailComponent,
    LoansRequestComponent,
    MicrofinanceDetailComponent,
    MicrofinanceComponent,
    LoansInputsComponent,
    HeaderProduitComponent,
    HeaderServiceComponent,
    HeaderFinanceComponent,
    ArticlesSearchComponent,
    HomeComponent,
    SingupLoansComponent,
    AdminRootHome,
    AdminRootProductComponent,
    AdminRootCoachingsComponent,
    AdminRootCoachingComponent,
    ConfigurationsComponent,
    AdminAccountComponent,
    MicrofinanceSearchComponent,
    CommandeEntreprenerComponent,
    CommandeClientComponent,
    DashboardComponent,
    AbonnementComponent,
    ActivationComponent,
    ProfileComponent,
    TemoignageComponent,
    InvestComponent,
    SocialRedirectComponent,
    LoansInputsDetailsComponent,
    LoansInputsViewComponent
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
  providers: [IconSetService,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
