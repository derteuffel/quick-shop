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
  coachingActivites: string[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.secteurs = ['Produit agricole','Energie','Secteur Agroalimentaire','Betails','Peches','Telephone portable','Bags','Services de reparation','Charpenterie',
    'Salon de beaute','Couture','Services culturel et social','Performance musicales', 'Danse','Video production','Performance theatrales', 'Peintures','Photographie','Achats des pieces de rechanges'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
  this.coachingActivites = ['Appel avec un coach', 'Coaching en ligne', 'Réunion de consultation en personne', 'Réunion de coaching en personne', 'Atelier', 'Formation','Conférence','Programme de bourse','Visite d\'échange'];
    this.getEntrepreneurForm();
  }

  secteursSelector(){
    switch(this.form.secteur){
      case 'Produit agricole':{
        this.activites = ['Ble','Riz','Haricots','Bananes','Chou','Manioc','Mais','Ananas','Pasteque','Oignons','Pommes de terre'];
        break;
      }
      case 'Energie':{
        this.activites = ['Installation des systemes d\'electricite','Paiement des factures d\'electricite','Conter un electricien','Acheter un generateur','Acheter du Gaz','Recharge gaz','Acheter du charbon'];
        break;
      }
      case 'Secteur Agroalimentaire':{
        this.activites =['Farine de manioc','Farine de mais','Farine de ble','Huile Vegetale (Palm)','Huile Vegetale (Cacahuetes)','Huile Vegetale (Coton)','Huile Vegetale (Avocat)','Jus','Lait','Yaourt','Pate de tomate','Confiture','Miel','Huile de palm'];
        break;
      }
  
      case 'Betails':{
        this.activites = ['Porc', 'Chevre','Lapins','Vaches','Poulets'];
        break;
      }
  
      case 'Peches':{
        this.activites = ['Capitain','Tilapia','Sangala','Mukeke','Ndagala','Kuhe','Ndagala fume'];
        break;
      }
      case 'Telephone portable':{
        this.activites = ['Telephone portable', 'Smart phone'];
        break;
      }
      
      case 'Bags':{
        this.activites = ['Sacs de classe','Sacs a main','Valises','Sacs de sports'];
        break;
      }
      case 'Services de reparation':{
        this.activites = ['Reparation telephone','Reparation bicyclette','Reparation Motocyclette','Reparation Bateaux','Auto ecole Camion','Auto ecole Voiture','Auto ecole Motocyclette',];
        break;
      }
  
      case 'Charpenterie':{
        this.activites = ['Chaise de salon','Chaise de salle a mange','Table d\'etude','Table de salon','Table salle a mange','Bureau pour Enseignant','Placard a vetement','Armoire de salon','Etagere a livres'];
        break;
      }
  
      case 'Salon de beaute':{
        this.activites = ['Lavage Cheuveux','Tresses','Raser les Cheuveux','Raser barbe','Maquillage','Pedicure','Manucure'];
        break;
      }
      case 'Couture':{
        this.activites = ['Tissus costume (Achat)','Kitenges (Achat)','Imvutano (Achat)','Tissus costume (Couture)','Kitenges (Couture)','Pantalon (Couture)','Jupe (Couture)','Chemise (Couture)','Culotte (Couture)'];
        break;
      }
      case 'Services culturel et social' :{
        this.activites = ['Plannification d\'evenement','Decoration evenementiel','Maitre de ceremonie','Traducteur'];
        break;
      }
  
      case 'Performance musicales' :{
        this.activites = ['Tambourinaire','Groupe acoustique','Groupe d\'interprete','Chorale','Deejay','Guitariste','Violon','Pianiste','Quatuor','Orchestre','Solo','Autre'];
        break;
      }
  
      case 'Danse':{
        this.activites = ['Groupe de danse traditionnel','Groupe de danse moderne', 'Autres'];
        break;
      }
      case 'Video production':{
        this.activites = ['Publicites','Documentaires','Evennementielle','Vlog', 'Autres'];
        break;
      }
      case 'Performance theatrales':{
        this.activites = ['Pieces','Sketches','Publicites','Commedies musicales','Paroles','Narrateur et conteur', 'Autres'];
        break;
      }
  
      case 'Peintures':{
        this.activites = ['Paysages','Portrait','Abstraite', 'Autres'];
        break;
      }
      case 'Photographie':{
        this.activites = ['Photodocumentaire','Phototheque','Couverture evenementielle','Portrait','Photo passeport', 'Autres'];
        break;
      }
  
      case 'Achats des pieces de rechanges':{
        this.activites = ['Motocyle', 'Vehicules', 'Camions'];
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

  onInvestorSubmit() {
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
  }

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


