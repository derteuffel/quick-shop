import {Routes} from "@angular/router";
import {SellerCommandeComponent} from "../../seller/commande/seller-commande/seller-commande.component";
import {DetailProductComponent} from "../../eco/product/detail-product/detail-product.component";
import {AdministrationDetailProductComponent} from "../../admin/product/administration-detail-product/administration-detail-product.component";
import {AddBoutiqueComponent} from "../../admin/boutique/add-boutique/add-boutique.component";
import {AdministrationUpdateProductComponent} from "../../admin/product/administration-update-product/administration-update-product.component";
import {SellerUpdateProductComponent} from "../../seller/product/seller-update-product/seller-update-product.component";
import {MenProductsComponent} from "../../eco/product/men-products/men-products.component";
import {CommandeComponent} from "../../admin/commande/commande/commande.component";
import {SellerAddProductComponent} from "../../seller/product/seller-add-product/seller-add-product.component";
import {SellerBoutiqueDetailComponent} from "../../seller/boutique/seller-boutique-detail/seller-boutique-detail.component";
import {SellerDetailProductComponent} from "../../seller/product/seller-detail-product/seller-detail-product.component";
import {SellerBoutiqueListComponent} from "../../seller/boutique/selle-boutique-list/seller-boutique-list.component";
import {BoutiqueComponent} from "../../admin/boutique/boutique/boutique.component";
import {SellerAddBoutiqueComponent} from "../../seller/boutique/seller-add-boutique/seller-add-boutique.component";
import {SellerUpdateBoutiqueComponent} from "../../seller/boutique/seller-update-boutique/seller-update-boutique.component";
import {BoutiqueDetailComponent} from "../../admin/boutique/boutique-detail/boutique-detail.component";
import {WomenProductsComponent} from "../../eco/product/women-products/women-products.component";
import {Role} from "../../models/role";
import {UpdateBoutiqueComponent} from "../../admin/boutique/update-boutique/update-boutique.component";
import {AuthGuard} from "../../auth/auth.guard";
import {AddProductComponent} from "../../admin/product/add-product/add-product.component";

export const AdminLayoutRoutes: Routes = [
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
    path: 'ecommerce/women/collection', component: WomenProductsComponent
  },
  {
    path: 'ecommerce/men/collection', component: MenProductsComponent
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
];
