import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthLoginInfo } from '../requests/login-info';
import { Parametre } from '../../models/parametre';
import { Role } from 'src/app/models/role';
import { AppConstants } from '../app-composant';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: Role;

  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
  }
  onSubmit() {
    console.log(this.form);
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password
    )
    this.authService.login(this.loginInfo).subscribe(

      data => {
        console.log(' login action');
        console.log(data);
        const type = data.type;
        if (typeof type === 'undefined'){
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          localStorage.setItem('id', this.authService.currentUserValue.id + '');
          this.role = this.authService.currentUserValue.role;
          switch(this.role){
            case Role.CLIENT:
              this.router.navigate(["/admin/commandes/users"]);
              break;
            case Role.ENTERPRENER:
              this.router.navigate(["/admin/home"]);
              break;
            case Role.TRAINNER:
              this.router.navigate(["/admin/coachings"]);
              break;
            case Role.LOANS:
              this.router.navigate(["/loans/requests"]);
              break;
            default: 
              this.router.navigate(["/admin/home"]);
          }
          console.log(this.role);
        }

        // this.reloadPage();
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
