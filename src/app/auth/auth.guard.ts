import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(data);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.currentUser){
        if(route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1){
          console.log(this.currentUser.role);
          console.log(route.data.roles);
          console.log(route.data.roles.indexOf(this.currentUser.role));
          this.router.navigateByUrl('401');
          return false;
        }
        return true;
      }
      console.log(this.currentUser);
      console.log('je suis ici');
      this.router.navigateByUrl('login');
    return false;
  }
  
}
