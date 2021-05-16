import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout.component';
import {RouterModule} from "@angular/router";
import {LoginComponent} from "../../auth/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthLayoutRoutes} from "./auth-layout.routing";
import {RegisterComponent} from "../../auth/register/register.component";



@NgModule({
  declarations: [AuthLayoutComponent,
                LoginComponent,
                RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthLayoutModule { }
