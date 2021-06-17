import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdministrationComponent} from "./admin/administration/administration.component";
import {Role} from "./models/role";
import {AuthGuard} from "./auth/auth.guard";
import {EcommerceComponent} from "./eco/ecommerce/ecommerce.component";
import {DetailProductComponent} from "./eco/product/detail-product/detail-product.component";

import {CommandeComponent} from "./admin/commande/commande/commande.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SingupComponent} from "./auth/singup/singup.component";
import {ArticlesComponent} from "./eco/articles/articles.component";
import {CoachingsComponent} from "./eco/coachings/coachings.component";
import {CoachingDetailComponent} from "./eco/coachings/coaching-detail/coaching-detail.component";
import {MicrofinanceComponent} from "./eco/microfinance/microfinance.component";
import {MicrofinanceDetailComponent} from "./eco/microfinance/microfinance-detail/microfinance-detail.component";
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
import {AdminAccountComponent} from "./admin/configurations/admin-account/admin-account.component";
import { LoansRequestComponent } from './loans/loans-request/loans-request.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import { MicrofinanceSearchComponent } from './eco/microfinance-search/microfinance-search.component';



const routes: Routes = [
  {
    path: 'admin/home', component: AdminRootHome,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT,Role.ENTERPRENER,Role.CLIENT,Role.LOANS,Role.TRAINNER]}
  },


  {
    path: 'ecommerce/home', component: EcommerceComponent
  },

  {
    path: 'ecommerce/produits', component: ArticlesComponent
  },
  {
    path: 'ecommerce/produits/search', component: ArticlesSearchComponent
  },

  {
    path: 'ecommerce/services', component: CoachingsComponent
  },
  {
    path: 'ecommerce/services/search', component: CoachingsSearchComponent
  },
  {
    path: 'ecommerce/finances/search', component: MicrofinanceSearchComponent
  },

  {
    path: 'ecommerce/register/home', component: HomeComponent
  },

  {
    path: 'ecommerce/register/entreprener', component: SingupComponent
  },
  {
    path: 'ecommerce/register/client', component: SingupClientComponent
  },
  {
    path: 'ecommerce/register/invester', component: SingupInvesterComponent
  },
  {
    path: 'ecommerce/register/coaching', component: SingupTrainnerComponent
  },
  {
    path: 'ecommerce/register/loans', component: SingupLoansComponent
  },


  {
    path: 'ecommerce/finances', component: MicrofinanceComponent
  },
  {
    path: 'ecommerce/product/detail/:id', component: DetailProductComponent
  },
  {
    path: 'ecommerce/coaching/detail/:id', component: CoachingDetailComponent
  },

  {
    path: 'ecommerce/loans/detail/:id', component: MicrofinanceDetailComponent
  },
  {
    path: 'admin/loans/inputs', component: AdminLoansInputsComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/loans/entrants', component: AdminLoansRequestComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT,Role.LOANS]}
  },
  {
    path: 'loans/requests', component: LoansRequestComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT,Role.LOANS]}
  },

  {
    path: 'admin/configurations/account', component: AdminAccountComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },

  {
    path: 'admin/produit/detail/:id', component: AdminRootProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.ENTERPRENER]}
  },
 {
    path: 'admin/commandes', component: CommandeComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },

  {
    path: 'admin/coachings', component: AdminRootCoachingsComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.TRAINNER]}
  },

  {
    path: 'admin/coachings/details/:id', component: AdminRootCoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT,Role.TRAINNER]}
  },

  {
    path: 'connexion', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'register/success', component: RegisterSuccessComponent
  },

  {
    path: 'signup', component: SingupComponent
  },

  {
    path: 'ecommerce/register/client', component: SingupClientComponent
  },

  {
    path: 'ecommerce/register/invester', component: SingupInvesterComponent
  },



  {
    path: '', redirectTo: 'ecommerce/home', pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){

    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    }
  }
}
