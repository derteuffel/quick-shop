import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  public focus;
  roles: string[];
  isConnected: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (this.authService.currentUserValue.token) {
      this.isConnected = true;
    }else{
      this.isConnected = false;
    }
  }

  logout() {
    this.authService.logout().subscribe(
      data => {

        console.log('you are now offline');
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
      }
    );

  }

}
