import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {AdministrationComponent} from "./admin/administration/administration.component";
import {Role} from "./models/role";
import {AuthGuard} from "./auth/auth.guard";
import {EcommerceComponent} from "./eco/ecommerce/ecommerce.component";
import {AddProductComponent} from "./admin/product/add-product/add-product.component";
import {DetailProductComponent} from "./eco/product/detail-product/detail-product.component";
import {AdministrationDetailProductComponent} from "./admin/product/administration-detail-product/administration-detail-product.component";
import {AdministrationUpdateProductComponent} from "./admin/product/administration-update-product/administration-update-product.component";
import {CommandeComponent} from "./admin/commande/commande/commande.component";
import {SellerAddProductComponent} from "./seller/product/seller-add-product/seller-add-product.component";
import {SellerDetailProductComponent} from "./seller/product/seller-detail-product/seller-detail-product.component";
import {SellerUpdateProductComponent} from "./seller/product/seller-update-product/seller-update-product.component";
import {BoutiqueComponent} from "./admin/boutique/boutique/boutique.component";
import {AddBoutiqueComponent} from "./admin/boutique/add-boutique/add-boutique.component";
import {BoutiqueDetailComponent} from "./admin/boutique/boutique-detail/boutique-detail.component";
import {UpdateBoutiqueComponent} from "./admin/boutique/update-boutique/update-boutique.component";
import {SellerBoutiqueListComponent} from "./seller/boutique/selle-boutique-list/seller-boutique-list.component";
import {SellerAddBoutiqueComponent} from "./seller/boutique/seller-add-boutique/seller-add-boutique.component";
import {SellerBoutiqueDetailComponent} from "./seller/boutique/seller-boutique-detail/seller-boutique-detail.component";
import {SellerUpdateBoutiqueComponent} from "./seller/boutique/seller-update-boutique/seller-update-boutique.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SellerCommandeComponent} from "./seller/commande/seller-commande/seller-commande.component";
import { CoachingComponent } from './coachings/coaching/coaching.component';
import { AddCoachingComponent } from './coachings/coaching/add-coaching/add-coaching.component';
import { DetailsCoachingComponent } from './coachings/coaching/details-coaching/details-coaching.component';



const routes: Routes = [
  {
    path: 'admin/home', component: AdministrationComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },

/*  {
    path: '',
    component: AdminLayoutComponent,
    data:{roles: [Role.ADMIN, Role.ROOT]},
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './admin/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },*/
  {
    path: 'ecommerce/home', component: EcommerceComponent
  },
  {
    path: 'admin/product/add/:id', component: AddProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'ecommerce/product/detail/:id', component: DetailProductComponent
  },
  {
    path: 'admin/product/detail/:id', component: AdministrationDetailProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/product/update/:id', component: AdministrationUpdateProductComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
 {
    path: 'admin/commandes', component: CommandeComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
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
  },
  {
    path: 'admin/coachings', component: CoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/coachings/add', component: AddCoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/coachings/details/:id', component: DetailsCoachingComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
  {
    path: 'admin/coachings/edit/:id', component: AddBoutiqueComponent,
    canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
  },
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
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
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
