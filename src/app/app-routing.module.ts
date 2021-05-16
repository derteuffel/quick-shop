import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {AdminLayoutsComponent} from "./layouts/admin-layouts/admin-layouts.component";
import {EcommerceComponent} from "./eco/ecommerce/ecommerce.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutsComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layouts/admin-layouts.module#AdminLayoutsModule'
      }
    ]
  },

  {
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
    path: '**',
    redirectTo: 'home'
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
