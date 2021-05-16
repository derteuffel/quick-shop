import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import {AdministrationComponent} from './admin/administration/administration.component';
import {EcommerceComponent} from './eco/ecommerce/ecommerce.component';

import { Role } from './models/role';
import { AuthGuard } from './auth/auth.guard';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {AdminLayoutsComponent} from "./layouts/admin-layouts/admin-layouts.component";

const routes: Routes = [
  {
  path: 'admin/home', component: AdministrationComponent,
  canActivate: [AuthGuard], data:{roles: [Role.ADMIN, Role.ROOT]}
}
  , {
    path: '',
    component: AdminLayoutsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: 'ecommerce/home', component: EcommerceComponent
  },


  {
    path: '', redirectTo: 'ecommerce/home', pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'ecommerce/home'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router){

    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    }
  }
}
