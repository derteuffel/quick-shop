import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdministrationComponent} from './admin/administration/administration.component';
import {EcommerceComponent} from './eco/ecommerce/ecommerce.component';
import {AddProductComponent} from './admin/product/add-product/add-product.component';
import {DetailProductComponent} from './eco/product/detail-product/detail-product.component';
import {AdministrationDetailProductComponent} from './admin/product/administration-detail-product/administration-detail-product.component';
import {AdministrationUpdateProductComponent} from './admin/product/administration-update-product/administration-update-product.component';
import {CommandeComponent} from './admin/commande/commande/commande.component';
import { WomenProductsComponent } from './eco/product/women-products/women-products.component';
import { MenProductsComponent } from './eco/product/men-products/men-products.component';
import { BoutiqueComponent } from './admin/boutique/boutique/boutique.component';
import { AddBoutiqueComponent } from './admin/boutique/add-boutique/add-boutique.component';
import { BoutiqueDetailComponent } from './admin/boutique/boutique-detail/boutique-detail.component';
import { UpdateBoutiqueComponent } from './admin/boutique/update-boutique/update-boutique.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SellerUpdateProductComponent } from './seller/product/seller-update-product/seller-update-product.component';
import { SellerUpdateBoutiqueComponent } from './seller/boutique/seller-update-boutique/seller-update-boutique.component';
import { SellerBoutiqueDetailComponent } from './seller/boutique/seller-boutique-detail/seller-boutique-detail.component';
import { SellerAddBoutiqueComponent } from './seller/boutique/seller-add-boutique/seller-add-boutique.component';
import { SellerBoutiqueListComponent } from './seller/boutique/selle-boutique-list/seller-boutique-list.component';
import { SellerCommandeComponent } from './seller/commande/seller-commande/seller-commande.component';
import { SellerDetailProductComponent } from './seller/product/seller-detail-product/seller-detail-product.component';
import { SellerAddProductComponent } from './seller/product/seller-add-product/seller-add-product.component';

const routes: Routes = [
  {
  path: 'admin/home', component: AdministrationComponent
},
  {
    path: 'ecommerce/home', component: EcommerceComponent
  },
  {
    path: 'admin/product/add/:id', component: AddProductComponent
  },
  {
    path: 'ecommerce/product/detail/:id', component: DetailProductComponent
  },
  {
    path: 'admin/product/detail/:id', component: AdministrationDetailProductComponent
  },
  {
    path: 'admin/product/update/:id', component: AdministrationUpdateProductComponent
  },
  {
    path: 'admin/commandes', component: CommandeComponent
  },
  {
    path: 'seller/product/add/:id', component: SellerAddProductComponent
  },
  {
    path: 'seller/product/detail/:id', component: SellerDetailProductComponent
  },
  {
    path: 'seller/product/update/:id', component: SellerUpdateProductComponent
  },
  {
    path: 'seller/commandes', component: SellerCommandeComponent
  },
  {
    path: 'ecommerce/women/collection', component: WomenProductsComponent
  },
  {
    path: 'ecommerce/men/collection', component: MenProductsComponent
  },
  {
    path: 'admin/boutiques', component: BoutiqueComponent
  },
  {
    path: 'admin/add/boutique', component: AddBoutiqueComponent
  },
  {
    path: 'admin/detail/boutique/:id', component: BoutiqueDetailComponent
  },
  {
    path: 'admin/update/boutique/:id', component: UpdateBoutiqueComponent
  },
  {
    path: 'seller/boutiques', component: SellerBoutiqueListComponent
  },
  {
    path: 'seller/add/boutique', component: SellerAddBoutiqueComponent
  },
  {
    path: 'seller/detail/boutique/:id', component: SellerBoutiqueDetailComponent
  },
  {
    path: 'seller/update/boutique/:id', component: SellerUpdateBoutiqueComponent
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
export class AppRoutingModule { }
