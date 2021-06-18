import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../../eco/product/products/products.component';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private collapsed = true;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  provinces: string [];
  communes: string [];
  produitForm: FormGroup;
  serviceForm: FormGroup;
  financeForm: FormGroup;

  types: string[];

  isEntreprener: boolean;
  isClient: boolean;
  isFinance: boolean;
  isTrainer: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.isFinance);
    console.log(this.isTrainer);
    console.log(this.isClient);
    console.log(this.isEntreprener);
 
    this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.communes = ['Bubanza','Gihanga','Musigati',' Mpanda','Rugazi','Muha','Mukaza','Ntahangwa','Isale','Kabezi','Kanyosha (Bujumbura rural)','Mubimbi','Mugongomanga','Mukike','Mutambu',
  'Mutimbuzi','Nyabiraba','Bururi','Matana','Mugamba','Rutovu','Songa','Vyanda','Cankuzo','Cendajuru','Gisagara','Kigamba','Mishiha',
'Buganda','Bukinanyana','Mabayi','Mugina','Murwi','Rugombo','Buhayira','Bugendana','Bukirasazi','Buraza','Giheta','Gishubi',
'Gitega','Itaba','Makebuko','Mutaho','Nyarusange','Ryansoro','Bugenyuzi','Buhiga','Gihogazi','Gitaramuka','Mutumba','Nyabikere','Shombo',
'Bugabira','Busoni',' Bwambarangwe',' Gitobe','Kirundo','Ntega','Vumbi','Kayogoro','Kibago','Mabanda','Makamba','Nyanza-Lac','Vugizo',
'Bukeye','Kiganda','Mbuye',' Muramvya','Rutegama','Buhinyuza','Butihinda','Gashoho','Gasorwe','Giteranyi','Muyinga','Mwakiro',
'Bisoro','Gisozi','Kayokwe','Ndava','Nyabihanga','Rusaka','Busiga','Gashikanwa','Kiremba','Marangara','Mwumba','Ngozi','Nyamurenza','Ruhororo',
'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi']
this.init();  
}


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  getProduitPage(){
    this.isEntreprener = true;
    this.isClient = false;
    this.isTrainer = false;
    this.isFinance = false;
    this.router.navigateByUrl('ecommerce/produits');
  }

  getClientPage(){
    this.isEntreprener = false;
    this.isClient = true;
    this.isTrainer = false;
    this.isFinance = false;
    this.router.navigateByUrl('');
  }

  getCoachingPage(){
    this.isEntreprener = false;
    this.isClient = false;
    this.isTrainer = true;
    this.isFinance = false;
    this.router.navigateByUrl('ecommerce/services');
  }

  getFinancePage(){
    this.isEntreprener = false;
    this.isClient = false;
    this.isTrainer = false;
    this.isFinance = true;
    this.router.navigateByUrl('ecommerce/finances');
  }

  reset() {
    this.productsC.reset();
  }

  init(){
    this.produitForm = new FormGroup({
      location: new FormControl(''),
      name: new FormControl(''),
      //minPrice: new FormControl(''),
      //maxPrice: new FormControl('')
    });

    this.serviceForm = new FormGroup({
      location: new FormControl(''),
      secteurActivite: new FormControl(''),
      //minPrice: new FormControl(''),
      //maxPrice: new FormControl('')
    });

    this.financeForm = new FormGroup({
      location: new FormControl(''),
      name: new FormControl(''),
    });


  }

  

}
