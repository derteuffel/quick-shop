import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header-produit',
  templateUrl: './header-produit.component.html',
  styleUrls: ['./header-produit.component.scss']
})
export class HeaderProduitComponent implements OnInit {

  produitForm: FormGroup;

  provinces: string[];
  communes: string[];
  types: string[];
  names: string[];
  measure: string;
  kgs:any;
  bananasTrunk: any;
  bags: any;
  watermelons: any;
  pineaples: any;
  mangos: any;
  liters: any;
  cans:string[];
  navigationParams: any = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.types = ['Produit agricole','Charbon','Récolte transformée','Bétail, poisson et autres produits'];


    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];

this.init();
}

namesSelector(){
  switch(this.produitForm.get('category').value){
    case 'Produit agricole':{
      this.names = ['Ble','Riz','Haricots','Bananes','Chou','Manioc','Mais','Ananas','Pasteque','Pommes de terre','Mangues'];
      break;
    }
    case 'Charbon':{
      this.names = ['Charbon'];
      break;
    }
    case 'Récolte transformée':{
      this.names =['Farine de manioc','Farine de mais','Farine de ble','Huile Vegetale (Palm)','Huile Vegetale (Cacahuetes)','Huile Vegetale (Coton)','Huile Vegetale (Avocat)','Lait','Yaourt','Pate de tomate'];
      break;
    }

    case 'Bétail, poisson et autres produits':{
      this.names = ['Poisson Mukeke','Poisson sangala','Poisson Kuhe','Poisson capitain','Ndagala','Ndagala fume', 'Viande de chevre','Viande de Porcs','Viande de Vaches','Poulets'];
      break;
    }
default:
  break;

  }
  

}

setValue(){
  
  switch(this.produitForm.get('name').value){
    case 'Ble':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Riz':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Haricots':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Manioc':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Mais':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Bananes':{ 
      this.measure = 'Banana trunk';
      break;
    }
    case 'Pasteques':{ 
      this.measure = 'Pasteque';
      break;
    }
    case 'Ananas':{ 
      this.measure = 'Ananas';
      break;
    }
    case 'Mangues':{ 
      this.measure = 'Mangue';
      break;
    }
    case 'Chou':{ 
      this.measure = 'Sac';
      break;
    }
    case 'Charbon':{
      this.measure = 'Sac';
      break;
    }
    case 'Farine de manioc':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Farine de ble':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Farine de mais':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Huile Vegetale (Palm)':{ 
      this.measure = 'Litre';
      break;
    }
    case 'huile Vegetale (Cacahouetes)':{ 
      this.measure = 'Litre';
      break;
    }
    case 'Huile Vegetale (Coton)':{ 
      this.measure = 'Litre';
      break;
    }
    case 'Huile Vegetale (Avocat)':{ 
      this.measure = 'Litre';
      break;
    }
    case 'Lait':{ 
      this.measure = 'Litre';
      break;
    }
    case 'Yaourt':{ 
      this.measure = 'Litre';
      break;
    }
    case 'Pate de tomate':{ 
      this.measure = 'Cans';
      break;
    }
    case 'Poisson Mukeke':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Poisson sangala':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Poisson Kuhe':{ 
      this.measure = 'Kg';
      break;
    }

    case 'Poisson capitain':{ 
      this.measure = 'Kg';
      break;
    }

    case 'Ndagala':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Ndagala fume':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Viande de chevre':{ 
      this.measure = 'Kg';
      break;
    }

    case 'Viande de Porcs':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Viande de vaches':{ 
      this.measure = 'Kg';
      break;
    }
    case 'Poulets':{ 
      this.measure = 'Kg';
      break;
    }

   
default:
  break
  }
}

selector(){
  console.log('je suis la')
  switch(this.produitForm.get('province').value){
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

  init(){
    this.produitForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl(''),
      category: new FormControl(''),
      quantity: new FormControl('')
    });
  }

  clear(){
    this.produitForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl(''),
      category: new FormControl(''),
      quantity: new FormControl('')
    });
  }

  onProduitSearch(){

    const produitNavigationExtras: NavigationExtras = {
      queryParams: {
        'values':JSON.stringify(this.produitForm.value)
      }
    };


      this.router.navigate(['/ecommerce/produits/search'], produitNavigationExtras );
      this.clear();

  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

}
