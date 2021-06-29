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
  microID;

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
  microForm: FormGroup;
  p: number = 1;
  searchItem: string;
  currentMicro;

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

    this.loadAbonnement();
    this.initForm1();
    this.types = [
      'PRODUCTS_SELLING',
      'COACHING_AND_SUPERVISION_SERVICE',
      'MICRO_FINANCEMENT'
    ];
  }

  loadData() {
    this.microService.getAllFinance().subscribe(
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
    this.microForm = new FormGroup({
      id: new FormControl(''),
      region: new FormControl(''),
      amount: new FormControl(''),
      userName: new FormControl(''),
      devise: new FormControl(''),
      userPhone: new FormControl(''),
      duration: new FormControl(''),
      bankName: new FormControl(''),
    });
  }


  setMicro(contentUpdate, event) {

    console.log(event);

    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentMicro = event.userName;
    this.microForm.patchValue({
      id: event.id,
      amount: event.amount,
      region: event.region,
      userName: event.userName,
      devise: event.devise,
      userPhone: event.userName,
      duration: event.duration,
      bankName: event.bankName
    })

  }

  updateMicro() {
    const microData = {
      id: this.microForm.get('id').value,
      amount: this.microForm.get('amount').value,
      region: this.microForm.get('region').value,
      userName: this.microForm.get('userName').value,
      devise: this.microForm.get('devise').value,
      userPhone: this.microForm.get('userPhone').value,
      duration: this.microForm.get('duration').value,
      bankName: this.microForm.get('bankName').value,
    };

    this.microService.updateFinance(microData).subscribe(
      (data: any) => {
        this.microForm.reset();
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }


  // fonction d'ajout du loans

  onSubmitLoans() {

    this.submitted = true;
    if (this.productForm?.invalid) { return; }
    const formData = new FormData();
    formData.append('file',this.productForm.get('file').value);
    formData.append('title', this.productForm.get('title').value);
    formData.append('region', this.productForm.get('region').value);
    formData.append('devise', this.productForm.get('devise').value);
    formData.append('amount', this.productForm.get('amount').value);
    formData.append('localisation', this.productForm.get('province').value+', '+this.productForm.get('commune').value);
    formData.append('file2', this.productForm.get('file2').value);
    formData.append('sector', this.productForm.get('sector').value);
    console.log(formData);
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

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.microID = event.id;

  }

  onDelete() {
    this.microService.deleteFinance(this.microID).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }

  activation(contentActivation, event) {
    console.log(event)
    this.modalService.open(contentActivation, {size: "lg"});
    this.microID = event.id;
    console.log(this.microID);

  }

  onActivate() {
    this.microService.getActivationMicrofinacement(this.microID).subscribe(
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

  openModalAddAbon(contentAddAbon){
    this.modalService.open(contentAddAbon, { size: 'lg' });
  }

  loadAbonnement() {
    this.abonnementService.getAll().subscribe(
      data => {
        this.abonnements = data;
      }, error => {
        console.log(error);
      }
    );
  }
  /** ajouter un abonnement **/
  saveAbonnement() {

    this.abonnementService.saveAbon(this.abonForm?.value).subscribe(
      (data: any) => {

        this.abonForm.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});
        this.loadAbonnement();
      }, error => {
        this.abonForm.reset();
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }

  // suppression d'un abonnement

  deleteAbon(contentDelete1, event) {
    this.modalService.open(contentDelete1, {size: 'lg'});
    this.abonnementId = event.id;
  }

  onDeleteAbon() {
    this.abonnementService.deleteOne(this.abonnementId).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Account is deleted successully', detail: 'record delete'});
        this.loadAbonnement();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
  }




}
