import { Component, OnInit } from '@angular/core';
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coachings-search',
  templateUrl: './coachings-search.component.html',
  styleUrls: ['./coachings-search.component.scss']
})
export class CoachingsSearchComponent implements OnInit {
  coachings: any = {};
  navigationParams: any = {};
  provinces: string[];
  communes: string[];
  types:string[];
  serviceForm: FormGroup;

  constructor(private coachingService: CoachingService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })
    console.log(this.navigationParams);
    
      console.log('je suis plutot la');
      this.loadSearchedCoaching(this.navigationParams);
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
    'Tangara','Bugarama','Burambi','Buyengero','Muhuta','Rumonge','Bukemba','Giharo','Gitanga','Mpinga-Kayove','Musongati','Rutana','Butaganzwa','Butezi','Bweru','Gisuru','Kinyinya','Nyabitsinda','Ruyigi'];
    this.init(); 
  }


  init(){
    this.serviceForm = new FormGroup({
      location: new FormControl(''),
      name: new FormControl('')
    });
  }


  onServiceSearch(){
    this.loadSearchedCoaching(this.serviceForm.value);
    this.init();
  }

  loadSearchedCoaching(form){
    this.coachingService.getAllCoachingSearch(form).subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

}
