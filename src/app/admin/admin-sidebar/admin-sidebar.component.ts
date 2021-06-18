import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/auth.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';

export const ROUTES =  [

];
@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user: User;
  isConnected: boolean;

  isClient: boolean;
  isAdmin: boolean;
  isEntreprener: boolean;
  isTrainer: boolean;
  isLoans: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
      this.user = this.authService.currentUserValue;
      switch(this.user.role){
        case Role.ADMIN: {
          this.isAdmin = true;
          break;
        }
        case Role.CLIENT: {
          this.isClient = true;
          break;
        }

        case Role.ENTERPRENER: {
          this.isEntreprener = true;
          break;
        }
        case Role.TRAINNER: {
          this.isTrainer = true;
          break;
        }

        case Role.LOANS: {
          this.isLoans = true;
          break;
        }
        default: {
          this.isAdmin = true;
        }
      }
    }else{
      this.isConnected = false;
    }
  }

}
