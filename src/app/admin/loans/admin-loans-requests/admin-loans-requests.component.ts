import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';
import {MicrofinanceService} from "../../../services/microfinance.service";
import {Abonnement} from "../../../models/abonnement";
import {AbonnementService} from "../../../services/abonnement.service";

@Component({
  selector: 'app-admin-loans-requests',
  templateUrl: './admin-loans-requests.component.html',
  styleUrls: ['./admin-loans-requests.component.scss'],
  providers: [MessageService]
})
export class AdminLoansRequestComponent implements OnInit {

  public submitted: boolean = false;
  abonForm: FormGroup;
  form: any = {};
  abonnements: any = [];
  abonnement: Abonnement;
  abonnementId;

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
  productForm: FormGroup;
  p: number = 1;
  searchItem: string;
  uploadedFile: File = null;

  constructor(
                            private loansService: LoansService,
                            private primengConfig: PrimeNGConfig,
                            private microService: MicrofinanceService,
                            private abonnementService: AbonnementService,
                            private fb: FormBuilder,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadData();
    this.initForm();
    this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];

    this.initForm1();

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

  initForm() {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      region: new FormControl(''),
      name: new FormControl(''),
      amount: new FormControl(''),
      title: new FormControl(''),
      province: new FormControl(''),
      devise: new FormControl(''),
      commune: new FormControl(''),
      sector: new FormControl(''),
      pictureUrl: new FormControl(null),
      // pictureUrl: new FormControl(''),
    });
  }


  // fonction d'ajout du loans

  onSubmitLoans() {

    this.submitted = true;
    if (this.productForm?.invalid) { return; }
    const formData = new FormData();
    formData.append('title', this.productForm.get('title').value);
    formData.append('region', this.productForm.get('region').value);
    formData.append('devise', this.productForm.get('devise').value);
    formData.append('amount', this.productForm.get('amount').value);
    formData.append('localisation', this.productForm.get('province').value+', '+this.productForm.get('commune').value);

    formData.append('sector', this.productForm.get('sector').value);
    if(!this.validateFile(this.uploadedFile.name)){
      this.messageService.add({severity:'error', summary:'Error', detail:'The uploaded file is not coorect please load and image', sticky: true});
      this.onReject();
    }else{
      formData.append('file2', this.uploadedFile);
      formData.append('file', this.uploadedFile);
      this.loansService.save(formData).subscribe(
        data => {
          this.productForm.reset();
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'loans submitted', sticky: true});
          this.loadData();
          console.log(this.productForm);
          console.log(data);
          window.location.reload();
        },
        error => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
          console.log(error);
        }
      );
    }

  }


  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'xls'||ext.toLowerCase() == 'docx'||ext.toLowerCase() == 'pdf') {
      return true;
    }
    else {
      return false;
    }
  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.loansRef = event.id;

  }

  onDelete() {
    this.microService.deleteFinance(this.loansRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }

  activation(contentActivation, event) {
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

  OnActiver(){
    this.microService.getActivationMicrofinacement(this.loansRef).subscribe(
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

  initForm1(){

    this.abonForm = new FormGroup({
      id: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      enabled: new FormControl(''),
      type: new FormControl(''),
    })

  }





}
