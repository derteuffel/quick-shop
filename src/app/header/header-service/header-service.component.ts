import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header-service',
  templateUrl: './header-service.component.html',
  styleUrls: ['./header-service.component.scss']
})
export class HeaderServiceComponent implements OnInit {

  serviceForm: FormGroup;

  provinces: string[];
  communes: string[];
  types: string[];
  names: string[];
  navigationParams: any = {};
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.types=['Soutien à l\'éducation formelle', 'Opportunités de Formation individuel', 'Opportunités de Formation de groupe'];    
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];

this.init();
  }

  selector(){
    console.log('je suis la')
    switch(this.serviceForm.get('province').value){
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

  nameSelector(){
    console.log('je suis la')
    switch(this.serviceForm.get('name').value){
        case 'Soutien à l\'éducation formelle':{
          this.names = ['Tutorat à l\'école primaire','Tutorat lycée','Formation agricole moderne','Formation d\'élevage moderne','Formation TVET','Formation en agro-alimentaire'];
            break;
        }
        case 'Opportunités de Formation individuel':{
          this.names =['Réunion de consultation/coaching en personne','Formation en ligne'];
            break;
        }
        case 'Opportunités de Formation de groupe':{
          this.names = ['Visite d\'échange','Atelier/Formation/Programme de bourses','Conference']
            break
        }
    }
  }

  init(){
    this.serviceForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl(''),
      category: new FormControl('')
    });
  }

  clear(){
    this.serviceForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl(''),
      category: new FormControl('')
    });
  }

  onServiceSearch(){

    const serviceNavigationExtras: NavigationExtras = {
      queryParams: {
        'values':JSON.stringify(this.serviceForm.value)
      }
    };
    console.log(this.serviceForm.value);


      this.router.navigate(['/ecommerce/services/search'], serviceNavigationExtras);
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
