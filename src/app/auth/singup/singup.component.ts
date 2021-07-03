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
  secteurs: string[];
  provinces: string[];
  communes: string[];
  activites: string[];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.secteurs = ['Agriculteur','Commercant','Agroalimentaire','Fournisseur de services'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    
  }

  secteursSelector(){
    switch(this.form.secteur){
      case 'Agriculteur':{
        this.activites = ['Riziculteur', 'Agriculteur(Palmiers)', 'Agriculteur(Manioc)', 'Producteur(Mais)','Producteur(Choux)','Producteur(Pasteque)','Producteur(Ananas)','Producteur(Mangue)', 'Fermier(Ble)','Fermier(Haricots)'];
        break;
      }
      case 'Commercant':{
        this.activites = ['Marchand(Charbon de bois)', 'Marchand(Farine de mais)', 'Marchand(Farine de Manioc)', 'Marchand(Farine de ble)','Marchand(Riz)','Marchand(Haricots)','Marchand(Banane)','Marchand(Ananas)','Marchand(Pasteque)','Marchand(Mangue)','Marchand(Lait)','Marchand(Huile de cuisson)','Marchand(Vaches)','Marchand(Chevres)','Marchand(Porcs)','Marchand(Poulets)','Marchand(Telephone portable)','Marchand(Kitenge)','Marchand(Sacs)'];
        break;
      }
      case 'Agroalimentaire':{
        this.activites = ['Production(Farine)', 'Transformation(Riz)', 'Production(Pate de tomate)', 'Production(Yaourt)','Production(Huile de cuisson)','Production(Confiture)'];
        break;
      }
      case 'Fournisseur de services':{
        this.activites = ['Services de reparation Velo', 'Charpentier', 'Services Salon de beaute', 'Services de couture','Services de reparation Telephone','Services de reparation Moto'];
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
      this.form.secteurActivite,
      this.form.password,      
      'ENTREPRENER',
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

}
