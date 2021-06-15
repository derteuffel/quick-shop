import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {AuthLoginInfo} from "../requests/login-info";
import {Router} from "@angular/router";
import {Role} from "../../models/role";
import { SignUpInfo } from '../requests/signup-info';
import { CustomerInfo } from '../requests/customer-info';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-singup-invester',
  templateUrl: './singup-invester.component.html',
  styleUrls: ['./singup-invester.component.scss']
})
export class SingupInvesterComponent implements OnInit {

  form: any = {};
  signupInfo: CustomerInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  isChecked= false;
  errorMessage = '';
  provinces: string[];
  communes: string[];
  activites: string[];
  constructor(private financeService: MicrofinanceService,
              private router: Router) { }

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

    this.signupInfo = new CustomerInfo(
      this.form.fullName,
      this.form.email,
      '',
      this.form.phone,
      this.form.devise,
      this.form.idNumber,
      this.form.amount,
      this.form.method);
    this.financeService.saveFinance(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        if(this.signupInfo.paymentMethod === 'VB'){
          console.log('Vous serez rediriger vers votre espace de paiement bancaire');
        }else if(this.signupInfo.paymentMethod === 'MM'){
          console.log('vous serez rediriger vers votre espace de payement mobile');
        }else{
          console.log('faite un versement de la somme preciser contre un recue de verification');
        }
        this.errorMessage = 'Votre requete a ete soumise avec succes, vous serrez redirige vers votre page de paiement';
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

  accept(){
    if(this.isChecked === false){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
    
  }

  reloadPage() {
    this.router.navigateByUrl('/ecommerce/home');
  }

}
