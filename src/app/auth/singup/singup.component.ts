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
  isEntrepreneur: boolean = false;
  isCoaching: boolean = false;
  isInvestor: boolean = false;
  isLoans: boolean = false;
  errorMessage = '';
  secteurs: string[];
  provinces: string[];
  communes: string[];
  activites: string[];
  categories: string[];
  coachingActivites: string[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.secteurs = ['Fermier','Commercant/Commercante','Secteur Agroalimentaire'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
  this.coachingActivites = ['Tuteur/Tutrice d\'école primaire', 'Tuteur/Tutrice de Lycee', 'Encadreur agricole moderne','Encadreur d\'élevage moderne','Encadreur EFTP','Coach agroalimentaire','Coach ou renforcement des capacités dans d\'autres domaines'];
    this.getEntrepreneurForm();
  }

  secteursSelector(){
    switch(this.form.secteur){
      case 'Fermier':{
        this.activites = ['Riziculteur','Agriculteur de palmiers','Agriculteur de manioc','Producteur de maïs','Fermier de blé','Fermier de haricots','Producteur de pommes de terre','Producteur de bananes','Producteur de choux','Producteur de pastèques','Producteur d\'ananas','Producteur de mangue'];
        break;
      }
      case 'Commercant/Commercante':{
        this.activites = ['Marchand de charbon','Marchant de farine de manioc','Marchant de farine de mais','Marchant de farine de ble','Marchant de riz','Marchant de haricots','Marchant de chou','Marchant de banane','Marchant d\'ananas','Marchant de pasteque','Marchant de mangue','Vendeur de lait','Marchand huile de table','Marchant de vache','Marchant de chevre','Marchant de cochon','Marchant de poulet'];
        break;
      }
      case 'Secteur Agroalimentaire':{
        this.activites =['Unité de production de farine','Unité de transformation du riz','Unité de production de pâte de tomate','Unité de production de yaourts','Unité de production d\'huile de cuisson','Producteur de confiture'];
        break;
      }
    }

  }


  selector(){
    console.log('je suis la')
    switch(this.form.province){
        case 'Bubanza':{
            this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi'];
            break;
        }
        case 'Bujumbura Mairie':{
            this.communes = ['Muha','Mukaza','Ntahangwa'];
            break;
        }
        case 'Bujumbura':{
            this.communes = ['Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
                    'Mutimbuzi','Nyabiraba'];
            break
        }

        case 'Bururi': {
            this.communes = ['Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda'];
            break;
        }
        case 'Cankuzo': {
            this.communes = ['Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha'];
            break;
        }

        case 'Cibitoke':{
            this.communes =['Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira'];
            break;
        }
        case 'Gitega':{
            this.communes =['Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
                    'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro'];
            break;
        }
        case 'Karuzi':{
            this.communes = ['Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo'];
            break;
        }
        case 'Kayanza':{
            this.communes = ['Butaganzwa','Gahombo',' Gatara',' Kabarore','kayanza','Matongo','Muhanga','Muruta','Rango'];
            break;
        }
        case 'Kirundo':{
            this.communes = ['Bugabira','Busoni','Bwambarangwe', 'Gitobe','Kirundo', 'Ntega','Vumbi'];
            break;
        }

        case 'Makamba':{
            this.communes = ['Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo'];
            break;
        }
        case 'Muramvya':{
            this.communes =['Bukeye','Kiganda','Mbuye','Muramvya','Rutegama'];
            break;
        }

        case 'Muyinga':{
            this.communes = ['Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro'];
            break;
        }
        case 'Mwaro':{
            this.communes = ['Bisoro', 'Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka'];
            break;
        }
        case 'Ngozi':{
            this.communes =['Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo','Tangara'];
            break;
        }
        case 'Rumonge':{
            this.communes =['Bugarama','Burambi','Buyengero','Muhuta','Rumonge'];
            break;
        }
        case 'Rutana':{
            this.communes = ['Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana'];
            break;
        }
        case 'Ruyigi':{
            this.communes =['Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
        }
    }
}

getEntrepreneurForm(){
  this.isEntrepreneur =  true;
  this.isInvestor = false;
  this.isLoans = false;
  this.isCoaching = false;
}
getCoachingForm(){
  this.isEntrepreneur =  false;
  this.isInvestor = false;
  this.isLoans = false;
  this.isCoaching = true;
}
getLoansForm(){
  this.isEntrepreneur =  false;
  this.isInvestor = false;
  this.isLoans = true;
  this.isCoaching = false;
}

getInvestorForm(){
  this.isEntrepreneur =  false;
  this.isInvestor = true;
  this.isLoans = false;
  this.isCoaching = false;
}


  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      this.form.province,
      this.form.commune,
      this.form.phone,
      this.form.birthDate,
      null,
      this.form.secteur+', '+this.form.secteurActivite,
      '',      
      'ENTERPRENER',
      '');

      console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = "Vous avez ete ajouter avec succes, vueillez vou connecter";
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

  onCoachingSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      this.form.province, 
      this.form.commune,
      this.form.phone,
      this.form.birthDate,
      '',
      this.form.secteurActivite,
      '',
      'TRAINNER',
      '');

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = "Enregistrement fait avec succes, vueillez-vous connecter";
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

  /* onInvestorSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      this.form.province,
      this.form.commune,
      this.form.phone,
      this.form.birthDate,
      this.form.idNumber,
      this.form.secteurActivite,
      '',
      'INVESTOR',
      '');

      console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = "Enregistrement fait avec succes, vueillez-vous connecter";
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
  } */

  onLearnerSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullName,
      this.form.email,
      this.form.email,
      this.form.province,
      this.form.commune,
      this.form.phone,
      this.form.birthDate,
      this.form.idNumber,
      this.form.secteurActivite,
      '',
      'LOANS',
      '');

      console.log(this.signupInfo);
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.errorMessage = "Enregistrement fait avec succes, vueillez-vous connecter";
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

}


