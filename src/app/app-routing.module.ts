import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdministrationComponent} from './administration/administration.component';
import {EcommerceComponent} from './ecommerce/ecommerce.component';
import {AddProductComponent} from './ecommerce/add-product/add-product.component';
import {DetailProductComponent} from './ecommerce/detail-product/detail-product.component';
import {AdministrationDetailProductComponent} from './administration/administration-detail-product/administration-detail-product.component';
import {AdministrationUpdateProductComponent} from './administration/administration-update-product/administration-update-product.component';
import {CommandeComponent} from './administration/commande/commande.component';
import { WomenProductsComponent } from './ecommerce/women-products/women-products.component';
import { MenProductsComponent } from './ecommerce/men-products/men-products.component';
import { BoutiqueComponent } from './boutique/boutique.component';
import { AddBoutiqueComponent } from './add-boutique/add-boutique.component';
import { BoutiqueDetailComponent } from './boutique-detail/boutique-detail.component';
import { UpdateBoutiqueComponent } from './update-boutique/update-boutique.component';

const routes: Routes = [
  {
  path: 'administration', component: AdministrationComponent
},
  {
    path: 'ecommerce', component: EcommerceComponent
  },
  {
    path: 'add-product/:id', component: AddProductComponent
  },
  {
    path: 'detail-product/:id', component: DetailProductComponent
  },
  {
    path: 'administration-detail-product/:id', component: AdministrationDetailProductComponent
  },
  {
    path: 'administration-update-product/:id', component: AdministrationUpdateProductComponent
  },
  {
    path: 'administration-commandes', component: CommandeComponent
  },
  {
    path: 'women-collection', component: WomenProductsComponent
  },
  {
    path: 'men-collection', component: MenProductsComponent
  },
  {
    path: 'boutiques', component: BoutiqueComponent
  },
  {
    path: 'add-boutique', component: AddBoutiqueComponent
  },
  {
    path: 'boutique-detail/:id', component: BoutiqueDetailComponent
  },
  {
    path: 'boutique-update/:id', component: UpdateBoutiqueComponent
  },
  {
    path: '', redirectTo: 'ecommerce', pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
