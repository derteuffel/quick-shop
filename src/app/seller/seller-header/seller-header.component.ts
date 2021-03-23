import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-seller-header',
  templateUrl: './seller-header.component.html',
  styleUrls: ['./seller-header.component.css']
})
export class SellerHeaderComponent implements OnInit {

  roles: string[];
  authority: string;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.authority = this.tokenStorage.getToken();
    }
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/login');
  }

}
