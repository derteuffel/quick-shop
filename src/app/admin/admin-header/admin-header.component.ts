import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

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
