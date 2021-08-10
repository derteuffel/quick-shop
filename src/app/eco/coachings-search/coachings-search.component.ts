import { Component, OnInit } from '@angular/core';
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-coachings-search',
  templateUrl: './coachings-search.component.html',
  styleUrls: ['./coachings-search.component.scss'],
  providers: [MessageService],
})
export class CoachingsSearchComponent implements OnInit {
  coachings: any = {};
  navigationParams: any = {};
  provinces: string[];
  communes: string[];
  types:string[];
  lists: any = {};
  p:number = 1;
  searchData: any = {};
  currentCoaching: any;
  subscribeForm: FormGroup;
  orderForm: FormGroup;
  isSelected: boolean = false;

  serviceForm: FormGroup;

  constructor(private coachingService: CoachingService, private activatedRoute: ActivatedRoute,
    private messageService: MessageService, private modalService: NgbModal,
    private commandeService: CommandeService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })
    console.log(this.navigationParams);

      this.loadSearchedCoaching(this.navigationParams);
      this.loadSearchedCoachingLike(this.navigationParams);
      this.types = ['Appel avec un coach', 'Coaching en ligne', 'Réunion de consultation en personne', 'Réunion de coaching en personne', 'Atelier', 'Formation','Conférence','Programme de bourse','Visite d\'échange'];
      this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
      'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
      this.loadSearchedCoachingByProvince(this.provinces);
    this.init();
  }

  showDetails(item){
    console.log(item);
    this.currentCoaching = item;
    this.isSelected = true;
    this.initForm();
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

  init(){
    this.serviceForm = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      name: new FormControl('')
    });
  }


  onServiceSearch(){
    const searchValue = {
      province: this.serviceForm.get('province').value,
      commune: this.serviceForm.get('commune').value,
      name: this.serviceForm.get('name').value
    }
    this.loadSearchedCoaching(this.serviceForm.value);
    this.loadSearchedCoachingByProvince(this.provinces);
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

  loadSearchedCoachingLike(form){
    console.log(form);
    this.coachingService.getAllCoachingSearchLike(form).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  loadSearchedCoachingByProvince(province){
    this.coachingService.getAllCoachingSearchByProvince(province,this.navigationParams).subscribe(
      data => {
        this.searchData = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  loadSearchedCoachingByLocation(province){
    this.coachingService.getAllCoachingSearchBylocation(province,this.navigationParams).subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  openModalFormulaire(contentAdd)  {
    this.modalService.open(contentAdd, {size: 'md'});
   }
 
   initForm(){
     this.subscribeForm = new FormGroup({
       name: new FormControl(''),
       email: new FormControl(''),
       phone: new FormControl(''),
     });
   }

  onSaveSubscribe(){
    const formData =  {
      clientName: this.subscribeForm.get('name').value,
      email: this.subscribeForm.get('email').value,
      clientPhone: this.subscribeForm.get('phone').value,
      isCoaching: true
    }
    this.commandeService.saveCmd(formData, this.currentCoaching.id).subscribe(
      data => {
        this.subscribeForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Votre commande a ete soumise vous serez rediriger vers la page de paiement', sticky: true});
        this.router.navigateByUrl('ecommerce/coaching/checkout/'+data.id);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Erreur systeme, vous ne devez avoir un compte pour participer a cette formation'});
        console.log(error);
      }
    )
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/** toast message function primeng  **/
onConfirm() {
  this.messageService.clear('c');
}

onReject() {
  this.messageService.clear('c');
}

clear() {
  this.messageService.clear();
}

}
