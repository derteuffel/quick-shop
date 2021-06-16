import { Component, OnInit } from '@angular/core';
import {Coaching} from "../../models/coaching";
import {CoachingService} from "../../services/coaching.service";
import {Microfinance} from "../../models/microfinance";
import {MicrofinanceService} from "../../services/microfinance.service";
import { LoansService } from 'src/app/services/loans.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-microfinance-search',
  templateUrl: './microfinance-search.component.html',
  styleUrls: ['./microfinance-search.component.scss']
})
export class MicrofinanceSearchComponent implements OnInit {

  lists: any = {};
  navigationParams: any = {};
  provinces: string[];
  communes: string[];
  types:string[];
  financeForm: FormGroup;

  constructor(private loansService: LoansService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })
    console.log(this.navigationParams);
    
      console.log('je suis plutot la');
      this.loadSearchedFinances(this.navigationParams);
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
    this.loadSearchedFinances(this.navigationParams);
  }

  init(){
    this.financeForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl('')
    });
  }

  onFinanceSearch(){
    const searchValue = {
      location: this.financeForm.get('province').value+', '+this.financeForm.get('commune').value,
      name: this.financeForm.get('name').value
    }
    this.loadSearchedFinances(this.financeForm.value);
    this.init();
  }

  loadSearchedFinances(form) {
    this.loansService.getAllSearch(form).subscribe(
      (res: any) => {
        this.lists = res;
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

}
