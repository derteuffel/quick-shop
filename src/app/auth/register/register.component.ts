import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {RegisterInfo} from "../requests/register-info";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  registerInfo: RegisterInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.form);

    this.registerInfo = new RegisterInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.registerInfo).subscribe(
      data => {
        console.log(data);
        //this.isSignedUp = true;
        //this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
