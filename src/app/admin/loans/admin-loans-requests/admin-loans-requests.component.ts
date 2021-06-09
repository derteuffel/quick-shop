import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-admin-loans-requests',
  templateUrl: './admin-loans-requests.component.html',
  styleUrls: ['./admin-loans-requests.component.scss'],
  providers: [MessageService]
})
export class AdminLoansRequestComponent implements OnInit {

  lists: any = {};
  loans: any = {};
  loansRef: number;

  provinces: string [];
  communes: string [];
  types: string[];

  provinceForm: FormGroup;
  communeForm: FormGroup;
  sectorForm: FormGroup;
  statusForm: FormGroup;

  p: number = 1;
  searchItem: string;

  constructor(private loansService: LoansService,
    private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadData();
  }

  loadData() {
    this.loansService.getAllLoans().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }


  onProvinceSearch() {
    this.loansService.getAllbyRegion(this.provinceForm.value).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onCommuneSearch() {
    this.loansService.getAllbyRegion(this.communeForm.value).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onSectorSearch() {
    this.loansService.getAllbySector(this.sectorForm.value).subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onStatusSearch() {
    if(this.statusForm.get('name').value === '1'){
      this.loansService.getAllbyStatus(true).subscribe(
        data => {
          this.lists = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }else{
      this.loansService.getAllbyStatus(false).subscribe(
        data => {
          this.lists = data;
          console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }
    
  }

  init(){
    this.provinceForm = new FormGroup({
      location: new FormControl(''),
    });

    this.communeForm = new FormGroup({
      location: new FormControl(''),
    });

    this.sectorForm = new FormGroup({
      name: new FormControl(''),
    });

    this.statusForm = new FormGroup({
      name: new FormControl(''),
    });


  }

  showProvinceSearch(contentProvinceSearch){
    this.modalService.open(contentProvinceSearch, {size: "md"});
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
    this.init();
  }

  showCommuneSearch(contentCommuneSearch){
    this.modalService.open(contentCommuneSearch, {size: "md"});
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

  showSectorSearch(contentSectorSearch){
    this.modalService.open(contentSectorSearch, {size: "md"});
    this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.init();
  }

  showStatusSearch(contentStatusSearch){
    this.modalService.open(contentStatusSearch, {size: "md"});
    this.init();
  }

  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    
    this.loans = event;

  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.loansRef = event.id;

  }

  onDelete() {
    this.loansService.delete(this.loansRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }

  activate(contentActivation, event) {
    console.log(event)
    this.modalService.open(contentActivation, {size: "lg"});
    this.loansRef = event.id;

  }

  onActivate() {
    this.loansService.active(this.loansRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is activated successully', detail:'record action'});
        this.loadData();
      }
    )
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
