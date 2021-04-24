import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent implements OnInit {

  roles: string[];
  isConnected: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.currentUserValue.token){
      this.isConnected = true;
    }else{
      this.isConnected = false;
    }
  
  }

  logout() {
    this.authService.logout;
    this.router.navigateByUrl('/login');
  }

}
