import { Component, OnInit } from '@angular/core';
import {Role} from "../../models/role";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AuthLoginInfo} from "../requests/login-info";

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: Role;
  private loginInfo: AuthLoginInfo;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue){
      this.router.navigateByUrl('login/success');
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
        if (typeof type === 'undefined'){

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          localStorage.setItem('id', this.authService.currentUserValue.id + '');
          this.role = this.authService.currentUserValue.role;
          if (this.role === Role.SELLER){
            this.router.navigateByUrl('/seller/boutiques');
          } else{
            this.router.navigateByUrl('/seller/boutiques');
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
