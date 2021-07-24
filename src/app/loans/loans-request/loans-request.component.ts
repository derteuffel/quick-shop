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
  sessionRef;
  message1: string;
  message2 : string;
  p: number = 1;
  searchItem: string;
  supportProject: File = null;
  validatedSupport: File = null;
  isValid1: boolean = false;
  isValid2: boolean = false;
  isValid: boolean = false;
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
  this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
    this.initForm();
    this.loadData();
  }

  selector(){
    console.log('je suis la')
    switch(this.loansFormGroup.get('province').value){
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

  initForm() {
    this.loansFormGroup = new FormGroup({
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
      if(!this.validateFile(file.name)){
        console.log('contains bad files1');
        this.message1 = 'Error the file should be in PDF, WORD or EXCEL file, please load correct format file';
        this.isValid = false;
      }else{
        console.log('contains good files1');
      this.loansFormGroup.get('projectSupport').setValue(file);
      this.isValid1 = true;
      if(this.isValid2){
        this.isValid = true;
      }
      }
    }
  }
  onFilesSelect2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if(!this.validateFile(file.name)){
        console.log('contains bad files2');
        this.message2 = 'Error the file should be in PDF, WORD or EXCEL file, please load correct format file';
        this.isValid = false;
      }else{
        console.log('contains good files2');
      this.loansFormGroup.get('validatedSupport').setValue(file);
      this.isValid2 = true;
      if(this.isValid1){
        this.isValid = true;
      }
      }
    }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'pdf'||ext.toLowerCase() == 'docx'||ext.toLowerCase() == 'xlsx'||ext.toLowerCase() == 'xls') {
        return true;
    }
    else {
        return false;
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
    formData.append('province', this.loansFormGroup.get('province').value);
    formData.append('commune',this.loansFormGroup.get('commune').value)
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

    this.loansFormGroup.patchValue({
      id: event.id,
      province: event.province,
      commune: event.commune,
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
      id: this.loansFormGroup.get('id').value,
      amount: this.loansFormGroup.get('amount').value,
      object: this.loansFormGroup.get('object').value,
      sector: this.loansFormGroup.get('sector').value,
      province: this.loansFormGroup.get('province').value,
      commune: this.loansFormGroup.get('commune').value,
      devise: this.loansFormGroup.get('devise').value,
      projectSupport: this.loansFormGroup.get('projectSupport').value,
      validatedSupport: this.loansFormGroup.get('validatedSupport').value
    }

    console.log(updateData);
    this.loansService.update(updateData, updateData.id).subscribe(
      (data: any) => {
        console.log(data);
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
