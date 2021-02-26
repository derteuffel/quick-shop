import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdministrationComponent} from './administration/administration.component';
import {EcommerceComponent} from './ecommerce/ecommerce.component';
import {AddProductComponent} from './ecommerce/add-product/add-product.component';
import {DetailProductComponent} from './ecommerce/detail-product/detail-product.component';
import {AdministrationDetailProductComponent} from './administration/administration-detail-product/administration-detail-product.component';
import {AdministrationUpdateProductComponent} from './administration/administration-update-product/administration-update-product.component';
import {CommandeComponent} from './administration/commande/commande.component';

const routes: Routes = [
  {
  path: 'administration', component: AdministrationComponent
},
  {
    path: 'ecommerce', component: EcommerceComponent
  },
  {
    path: 'add-product', component: AddProductComponent
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
    path: '', redirectTo: 'ecommerce', pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
