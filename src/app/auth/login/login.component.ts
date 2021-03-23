import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthLoginInfo } from '../requests/login-info';
import { TokenStorageService } from '../token-storage.service';
import { Parametre } from '../../models/parametre';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router, private param: Parametre) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.login(this.loginInfo).subscribe(
      
      data => {
        console.log(' login action');
        console.log(data);
        const type = data.type;
        if(typeof type === 'undefined'){
          this.param.connecte = true;
          this.param.username = data.username;
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;
          if(this.roles.includes('ROLE_ROOT') || this.roles.includes('ROLE_SELLER')){
            this.router.navigateByUrl('/admin/boutiques');
          } else{
            this.router.navigateByUrl('/seller/boutiques')
          }
          console.log(this.roles);
        }
        
        //this.reloadPage();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    this.router.navigateByUrl('/boutiques');
  }

}
