import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {AdministrationComponent} from "./admin/administration/administration.component";
import {Role} from "./models/role";
import {AuthGuard} from "./auth/auth.guard";
import {EcommerceComponent} from "./eco/ecommerce/ecommerce.component";
import {AddProductComponent} from "./admin/product/add-product/add-product.component";
import {DetailProductComponent} from "./eco/product/detail-product/detail-product.component";

import {AdministrationUpdateProductComponent} from "./admin/product/administration-update-product/administration-update-product.component";
import {CommandeComponent} from "./admin/commande/commande/commande.component";
import {BoutiqueComponent} from "./admin/boutique/boutique/boutique.component";
import {AddBoutiqueComponent} from "./admin/boutique/add-boutique/add-boutique.component";
import {BoutiqueDetailComponent} from "./admin/boutique/boutique-detail/boutique-detail.component";
import {UpdateBoutiqueComponent} from "./admin/boutique/update-boutique/update-boutique.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {CoachingComponent} from './coachings/coaching/coaching.component';
import {AddCoachingComponent} from './coachings/coaching/add-coaching/add-coaching.component';
import {DetailsCoachingComponent} from './coachings/coaching/details-coaching/details-coaching.component';
import {SingupComponent} from "./auth/singup/singup.component";
import {ArticleComponent} from "./admin/boutique/article/article.component";
import {ArticlesComponent} from "./eco/articles/articles.component";
import {CoachingsComponent} from "./eco/coachings/coachings.component";
import {CoachingDetailComponent} from "./eco/coachings/coaching-detail/coaching-detail.component";
import {MicrofinanceComponent} from "./eco/microfinance/microfinance.component";
import {MicrofinanceDetailComponent} from "./eco/microfinance/microfinance-detail/microfinance-detail.component";
import { LoansComponent } from './loans/loans/loans.component';
import { LoansSortantComponent } from './loans/loans-sortant/loans-sortant.component';
import { ArticlesSearchComponent } from './eco/articles-search/articles-search.component';
import { CoachingsSearchComponent } from './eco/coachings-search/coachings-search.component';
import { HomeComponent } from './auth/home/home.component';
import { SingupTrainnerComponent } from './auth/singup-trainner/singup-trainner.component';
import { SingupClientComponent } from './auth/singup-client/singup-client.component';
import { SingupInvesterComponent } from './auth/singup-invester/singup-invester.component';
import { SingupLoansComponent } from './auth/singup-loans/singup-loans.component';
import { AdminRootHome } from './admin/admin-root-home/admin-root-home.component';
import { AdminRootProductComponent } from './admin/admin-root-product/admin-root-product.component';


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
    path: 'ecommerce/register/home', component: HomeComponent
  },

  {
    path: 'ecommerce/register/entreprener', component: SingupComponent
  },
  {
    path: 'ecommerce/register/coaching', component: SingupTrainnerComponent
  },
  {
    path: 'ecommerce/register/loans', component: SingupLoansComponent
  },


  {
    path: 'ecommerce/microfinance', component: MicrofinanceComponent
  },
  {
    path: 'ecommerce/product/detail/:id', component: DetailProductComponent
  },
  {
    path: 'ecommerce/coaching/detail/:id', component: CoachingDetailComponent
  },

  {
    path: 'ecommerce/microfinance/detail/:id', component: MicrofinanceDetailComponent
  },
  {
    path: 'admin/loans', component: LoansComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/loans/entrant', component: LoansSortantComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT,Role.LOANS]}
  },
  {
    path: 'admin/produit/detail/:id', component: AdminRootProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.ENTERPRENER]}
  },
 {
    path: 'admin/commandes', component: CommandeComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  /* {
    path: 'seller/product/add/:id', component: SellerAddProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/product/detail/:id', component: SellerDetailProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/product/update/:id', component: SellerUpdateProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/commandes', component: SellerCommandeComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  }, 
 {
    path: 'admin/boutiques', component: BoutiqueComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/add/boutique', component: AddBoutiqueComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/detail/boutique/:id', component: BoutiqueDetailComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/update/boutique/:id', component: UpdateBoutiqueComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },*/
  {
    path: 'admin/coachings', component: CoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  
  {
    path: 'admin/coachings/details/:id', component: DetailsCoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  /* 
  {
    path: 'seller/boutiques', component: SellerBoutiqueListComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/add/boutique', component: SellerAddBoutiqueComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/detail/boutique/:id', component: SellerBoutiqueDetailComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  },
  {
    path: 'seller/update/boutique/:id', component: SellerUpdateBoutiqueComponent, canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT, Role.SELLER]}
  }, */
  {
    path: 'connexion', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
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
  }];

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
