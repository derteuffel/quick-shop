import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {CustomerInfo} from "../requests/customer-info";
import { SignUpInfo } from '../requests/signup-info';

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
  constructor(private authService: AuthService) { }

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
      this.form.password,
      this.form.province+', '+this.form.commune,
      this.form.phone,
      this.form.birthDate,
      this.form.idNumber,
      this.form.secteurActivite,
      'CLIENT',
      this.form.interest);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = 'Enregistrer avec succes, vueillez-vous connecter';
        window.location.reload();
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
