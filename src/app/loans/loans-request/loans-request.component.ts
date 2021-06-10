import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-loans-request',
  templateUrl: './loans-request.component.html',
  styleUrls: ['./loans-request.component.scss'],
  providers: [MessageService]
})
export class LoansRequestComponent implements OnInit {

  lists: any = {};
  boutiqueRef
  sessionRef
  p: number = 1;
  searchItem: string;
  types: string[];
  provinces: string[];
  communes: string[];
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public loansFormGroup?: FormGroup;
  public loansUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public loans;
  public currentSession;
  constructor(              //private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private loansService: LoansService,
                            private fb: FormBuilder,
                            private router: Router,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.loansFormGroup = new FormGroup({
      province: new FormControl(''),
      commune: new FormControl(''),
      amount:  new FormControl(''),
      sector:  new FormControl(''),
      projectSupport:  new FormControl(null),
      validatedSupport: new FormControl(null),
      object: new FormControl(''),
      devise: new FormControl('')
    });

    this.loansUpdateFormGroup = new FormGroup({
      id: new FormControl(''),
      province: new FormControl(''),
      commune: new FormControl(''),
      amount:  new FormControl(''),
      sector:  new FormControl(''),
      projectSupport:  new FormControl(null),
      validatedSupport: new FormControl(null),
      object: new FormControl(''),
      devise: new FormControl('')
    });
  }

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.loansFormGroup.get('projectSupport').setValue(file);
    }
  }
  onFilesSelect2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.loansFormGroup.get('validatedSupport').setValue(file);
    }
  }

  loadData() {
    this.loansService.getAllbyUser().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  saveLoans() {
    this.submitted = true;
    if (this.loansFormGroup?.invalid) return;
    const formData = new FormData();
    formData.append('file',this.loansFormGroup.get('projectSupport').value);
    formData.append('file2',this.loansFormGroup.get('validatedSupport').value);
    formData.append('region', this.loansFormGroup.get('province').value+', '+this.loansFormGroup.get('commune').value);
    formData.append('amount', this.loansFormGroup.get('amount').value);
    formData.append('sector', this.loansFormGroup.get('sector').value);
    formData.append('devise', this.loansFormGroup.get('devise').value);
    formData.append('title', this.loansFormGroup.get('object').value);
    console.log(this.loansFormGroup.value);
    console.log(formData)
     this.loansService.save(formData).subscribe(
      (data: any) => {
        // this.router.navigateByUrl('/admin/boutiques');
        this.loansFormGroup.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'coaching submitted', sticky: true});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    ); 
    this.submitted = false;
  }


  setCoaching(contentUpdate, event) {

    this.modalService.open(contentUpdate, {size: "lg"});
    this.loans = event;

    this.loansUpdateFormGroup.patchValue({
      id: event.id,
      province: event.region,
      commune: event.region,
      amount:  event.amount,
      sector:  event.sector,
      object:  event.object,
      projectSupport: event.projectSupport,
      validatedSupport: event.validatedSupport,
      devise: event.devise
    });
  }

  getLoans(contentDetails, event) {

    this.modalService.open(contentDetails, {size: "lg"});
    this.loans = event;
  }

  updateCoaching() {
    const updateData = {
      id: this.loansUpdateFormGroup.get('id').value,
      amount: this.loansUpdateFormGroup.get('amount').value,
      object: this.loansUpdateFormGroup.get('object').value,
      sector: this.loans.get('sector').value,
      region: this.loansUpdateFormGroup.get('province').value+', '+this.loansUpdateFormGroup.get('commune').value,
      devise: this.loansUpdateFormGroup.get('devise').value

    }

    console.log(updateData);
    this.loansService.update(updateData).subscribe(
      (data: any) => {
        this.loansUpdateFormGroup.reset();
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }


  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  onDelete() {
    this.loansService.delete(this.boutiqueRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
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

  openModalAddCompany(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg' });

  }


}
