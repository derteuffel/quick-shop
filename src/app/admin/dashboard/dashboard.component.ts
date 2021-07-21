import { Component, OnInit } from '@angular/core';
import {CommandeService} from "../../services/commande.service";
import {EcommerceService} from "../../services/ecommerce.service";
import {CoachingService} from "../../services/coaching.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  res: any;
  productForm: FormGroup;
  coachingForm: FormGroup;
  nameForm: FormGroup;
  communes: string[];
  names: string[];
  categories: string[];

     

  provinces: string [];
  constructor(
      private commandeService: CommandeService,
      private ecommerceService: EcommerceService,
      private coachingService: CoachingService,
      private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.categories = ['Produit agricole','Charbon','Secteur Agroalimentaire','Betails','Peches','Telephone portable','Kintenges','Bags','Services de reparation','Charpenterie',
  'Salon de beaute','Couture'];
  }
  namesSelector(){
    switch(this.productForm.get('category').value){
      case 'Produit agricole':{
        this.names = ['Ble','Riz','Haricots','Bananes','Chou','Manioc','Mais','Ananas','Pasteque','Oignons','Pommes de terre'];
        break;
      }
      case 'Charbon':{
        this.names = ['Charbon'];
        break;
      }
      case 'Secteur Agroalimentaire':{
        this.names =['Farine de manioc','Farine de mais','Farine de ble','Huile Vegetale (Palm)','Huile Vegetale (Cacahuetes)','Huile Vegetale (Coton)','Huile Vegetale (Avocat)','Jus','Lait','Yaourt','Pate de tomate','Confiture','Miel','Huile de palm'];
        break;
      }

      case 'Betails':{
        this.names = ['Porc', 'Chevre','Lapins','Vaches','Poulets'];
        break;
      }

      case 'Peches':{
        this.names = ['Capitain','Tilapia','Sangala','Mukeke','Ndagala','Kuhe','Ndagala fume'];
        break;
      }
      case 'Telephone portable':{
        this.names = ['Telephone portable'];
        break;
      }
      case 'Kintenges':{
        this.names = ['Kitenges'];
        break;
      }
      case 'Bags':{
        this.names = ['Bags'];
        break;
      }
      case 'Services de reparation':{
        this.names = ['Reparation telephone','Reparation bicyclette','Reparation Motocyclette','Auto ecole Camion','Auto ecole Voiture','Auto ecole Motocyclette','Plannification d\'evenement','Decoration evenementiel','Dance de salon','Dj','Theatre','Peinture','Audiovisuel'];
        break;
      }

      case 'Charpenterie':{
        this.names = ['Chaise de salon','Chaise de salle a mange','Table d\'etude','Table de salon','Table salle a mange','Bureau pour Enseignant','Placard a vetement','Armoire de salon','Etagere a livres'];
        break;
      }

      case 'Salon de beaute':{
        this.names = ['Lavage Cheuveux','Tresses','Raser les Cheuveux','Raser barbe',''];
        break;
      }
      case 'Couture':{
        this.names = ['Tissus costume (Achat)','Kitenges (Achat)','Imvutano (Achat)','Tissus costume (Couture)','Kitenges (Couture)','Pantalon (Couture)','Jupe (Couture)','Chemise (Couture)','Culotte (Couture)'];
        break;
      }

    }

  }




  init() {
    this.productForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      category: new FormControl(''),
      name: new FormControl('')
    });

    this.coachingForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl('')
    });





  }

  showProvinceSearch(contentProvinceSearch){
    this.modalService.open(contentProvinceSearch, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
     this.init();
  }

  selector(){
    console.log('je suis la')
    switch(this.productForm.get('province').value){
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


  selectors(){
    console.log('je suis la')
    switch(this.coachingForm.get('province').value){
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


  

  showCommandProductSearch(contentCommandProductSearch2){
    this.modalService.open(contentCommandProductSearch2, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }

  showCoachingSearch(contentProvinceSearch2){
    this.modalService.open(contentProvinceSearch2, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }


  

  onProductSearch() {
    const form = {
      region: this.productForm.get('province').value+', '+this.productForm.get('commune').value,
      name: this.productForm.get('name').value,
      category: this.productForm.get('category').value
    }
    this.ecommerceService.findAllQuantityOfProductAvailable(form).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }



  onCoachingSearch() {
    const form = {
      region: this.coachingForm.get('province').value+', '+this.coachingForm.get('commune').value,
      title: this.coachingForm.get('title').value,
    }
    this.coachingService.findAllQuantityOfCoahingAvailable(this.coachingForm.value).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  /* getQuantityCommandCoachingByRegion() {
    this.commandeService.getQuantityCommandCoachingByRegion(this.dataFilter.location).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  getQuantityCommandProductByRegion(){
    this.commandeService.getQuantityCommandProductByRegion(this.dataFilter.location).subscribe(
      data => {
        this.res = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  } */

}
