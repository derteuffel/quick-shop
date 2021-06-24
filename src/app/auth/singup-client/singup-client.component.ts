import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {CustomerInfo} from "../requests/customer-info";
import { SignUpInfo } from '../requests/signup-info';
import {TokenDto} from "../../models/token-dto";
import {TokenService} from "../../services/token.service";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-singup-client',
  templateUrl: './singup-client.component.html',
  styleUrls: ['./singup-client.component.scss']
})
export class SingupClientComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  provinces: string[];
  communes: string[];
  activites: string[];
  socialUser: SocialUser;
  constructor(private authService: AuthService,
              private router: Router,
              private authService1: SocialAuthService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.activites = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
  'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];

  }


  onSubmit() {
    console.log(this.form);
    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      this.form.province+', '+this.form.commune,
      this.form.phone,
      this.form.birthDate,
      this.form.idNumber,
      this.form.secteurActivite,
      this.form.password,
      'CLIENT',
      this.form.interest);
      console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = 'Enregistrer avec succes, vueillez-vous connecter';
        this.router.navigateByUrl('register/success');
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


  signInWithGoogle(): void {
    this.authService1.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenGoogle = new TokenDto(this.socialUser.idToken);
        this.authService.google(tokenGoogle).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.router.navigate(['/admin/home']);
          },
          err => {
            console.log(err);

          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  signInWithFB(): void {
    this.authService1.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        const tokenFace = new TokenDto(this.socialUser.authToken);
        this.authService.facebook(tokenFace).subscribe(
          res => {
            this.tokenService.setToken(res.value);
            this.router.navigate(['/admin/home']);
          },
          err => {
            console.log(err);
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

}
