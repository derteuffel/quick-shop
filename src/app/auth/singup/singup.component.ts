import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {SignUpInfo} from "../requests/signup-info";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  locations: string[];
  activites: string[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.locations = ['Bujumbura Mairie','Bujumbura', 'Cibitoke', 'Kirundo', 'Rutana', 'Makamba'];
    this.activites = ['Agriculture','Elevage','Peche','Education','Pisciculture','Agro-alimentaire','Industrie'];
  }


  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      '1234567890',
      this.form.location,
      this.form.phone,
      this.form.birthDate,
      this.form.secteurActivite);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        //this.isSignedUp = true;
        //this.isSignUpFailed = false;
        //this.router.navigateByUrl('login');
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
