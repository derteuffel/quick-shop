import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {CustomerInfo} from "../requests/customer-info";

@Component({
  selector: 'app-customer-up',
  templateUrl: './customer-up.component.html',
  styleUrls: ['./customer-up.component.scss']
})
export class CustomerUpComponent implements OnInit {

  form: any = {};
  customerInfo: CustomerInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    console.log(this.form);

    this.customerInfo = new CustomerInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.customerInfo).subscribe(
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
