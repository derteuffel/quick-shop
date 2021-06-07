import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

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
    this.authService.logout();
        
        console.log('you are now offline');
        this.router.navigateByUrl('/connexion');
    
  }

}
