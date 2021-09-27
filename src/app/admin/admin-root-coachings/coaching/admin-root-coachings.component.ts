import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
import { Coaching } from 'src/app/models/coaching';
import { CoachingService } from 'src/app/services/coaching.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';
import {AbonnementService} from "../../../services/abonnement.service";
import {Abonnement} from "../../../models/abonnement";


@Component({
  selector: 'app-admin-root-coachings',
  templateUrl: './admin-root-coachings.component.html',
  styleUrls: ['./admin-root-coachings.component.scss'],
  providers: [MessageService],
})
export class AdminRootCoachingsComponent implements OnInit {

  public submitted: boolean = false;
  abonForm: FormGroup;
  form: FormGroup;
  formUpdate: FormGroup;
  abonnements: any = [];
  abonnement: Abonnement;
  abonnementId;
  message: string;
  isValid: boolean = false;
  coachingID;

  lists: any = [];
  types: string[];
  boutiqueRef;
  code: string;
  frequencies: string[];
  sessionRef
  p: number = 1;
  commune: string;
  province: string;
  searchItem: string;
  uploadedFile: File = null;
  public sessionSubmitted: boolean = false;
  public coachingUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public currentCoaching: Coaching;
  public currentSession;
  communes: string[];
  provinces: string[];
  constructor(              private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private abonnementService: AbonnementService,
                            private fb: FormBuilder,
                            private router: Router,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.initForm();
    this.primengConfig.ripple = true;
    this.loadData();
    this.frequencies = ['Hebdommadaire','Mensuelle','Trimestrielle','Semestrielle','Annuelle'];
    this.types = ['Appel avec un coach', 'Coaching en ligne', 'Réunion de consultation en personne', 'Réunion de coaching en personne', 'Atelier', 'Formation','Conférence','Programme de bourse','Visite d\'échange'];
    this.provinces = ['Bubanza', 'Bujumbura Mairie', 'Bujumbura', 'Bururi', 'Cankuzo', 'Cibitoke', 'Gitega', 'Karuzi',
  'Kayanza', 'Kirundo', 'Makamba', 'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi','Rumonge','Rutana','Ruyigi'];
  }



 initForm(){

    this.form = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(''),
      phone: new FormControl(''),
      province: new FormControl(''),
      commune: new FormControl(''),
      builderName: new FormControl(''),
      email: new FormControl(''),
      amount: new FormControl(''),
      devise: new FormControl(''),
      startDate: new FormControl(null),
      description: new FormControl(''),
      frequency: new FormControl(''),
      type: new FormControl(''),
      dateLimiteDenregistrement: new FormControl(null),
      dateFinFormation: new FormControl(null),


    })

 }

 selector(){
  console.log('je suis la')
  switch(this.form.get('province').value){
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

selectorCode(){
  console.log('je suis la')
  switch(this.form.get('type').value){
      case 'Appel avec un coach':{
          this.code = 'CM1'
          break;
      }
      case 'Coaching en ligne':{
          this.code = 'CM1';
          break;
      }
      case 'Réunion de coaching en personne':{
          this.code = 'CM1';
          break
      }

      case 'Réunion de consultation en personne': {
          this.code = 'CM2';
          break;
      }
      case 'Atelier': {
          this.code = 'CM3';
          break;
      }

      case 'Formation':{
          this.code = 'CM3';
          break;
      }
      case 'Conférence':{
          this.code = 'CM3';
          break;
      }
      case 'Programme de bourse':{
          this.code = 'CM4';
          break;
      }
      case 'Visite d\'échange':{
          this.code ='CM4';
          break;
      }
      default :{
        break
      }
      
  }
}

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
        this.uploadedFile = file;
      
    }
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  loadData() {
    this.coachingService.getAllCoachingByUser().subscribe(
      data => {
        this.lists = data;
      }, error => {
        console.log(error);
      }
    );
  }
  /** ajouter un coaching **/
  saveCoaching() {
    let startDate = this.form.get('startDate').value;
    let endSubscribeDate = this.form.get('dateLimiteDenregistrement').value;
    this.selectorCode();
    const formData = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('amount', this.form.get('amount').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('email', this.form.get('email').value);
    formData.append('devise', this.form.get('devise').value);
    formData.append('province', this.form.get('province').value);
    formData.append('commune',this.form.get('commune').value);
    formData.append('builderName', this.form.get('builderName').value);
    formData.append('startDate', startDate);
    formData.append('type', this.form.get('type').value);
    formData.append('dateFinFormation', this.form.get('dateFinFormation').value);
    formData.append('dateLimiteDenregistrement', endSubscribeDate);
    formData.append('code', this.code);
    formData.append('frequency', this.form.get('frequency').value);

    formData.append('file', this.uploadedFile);


    this.submitted = true;
    if(this.uploadedFile==null || this.uploadedFile==undefined){
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Empty file, you have to attach file before save'});
    }else{
      if(!this.validateFile(this.uploadedFile.name)){
        this.message = 'File should be image, please load correct file';
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.message});
      }else{
     this.coachingService.saveCoaching(formData).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'coaching submitted', sticky: true});
        this.initForm();
        this.loadData();
        window.location.reload();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
      }
    }

    this.submitted = false;
    }

    validateFile(name: String) {
      var ext = name.substring(name.lastIndexOf('.') + 1);
      if (ext.toLowerCase() == 'png'||ext.toLowerCase() == 'jpg'||ext.toLowerCase() == 'jpeg') {
          return true;
      }
      else {
          return false;
      }
  }
   dateRangeValidator(min: Date, max: Date): ValidatorFn {
    return control => {
      if (!control.value) return null;
      console.log('je suis dans le test');
      const dateValue = new Date(control.value);

      if (min && dateValue < min) {
        console.log('je ne marche pas 1');
        this.messageService.add({severity:'error', summary:'Error', detail:'The Start date cannot be greater than end date'});
        return { message: 'error message' };
      }

      if (max && dateValue > max) {
        console.log('je ne marche pas 2');
        this.messageService.add({severity:'error', summary:'Error', detail:'The End date cannot be greater than maximum'});
        return { message: 'error message' };
      }

      null;
    }
  }

  isObjectCheck(obj: any): boolean {
    for (var key in this) {
      if (this.hasOwnProperty(key)) return false;
    }
    return true;
  }


  setCoaching(contentUpdate, event) {

    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentCoaching = event;
    this.coachingID = event.id;
    this.form.patchValue({
      id: event.id,
      title: event.title,
      phone: event.phone,
      province: event.province,
      commune: event.commune,
      email: event.email,
      amount: event.amount,
      devise: event.devise,
      builderName: event.builderName,
      startDate: event.startDate,
      type: event.type,
      frequency: event.frequency,
      description: event.description,
      dateFinFormation: event.dateFinFormation,
      dateLimiteDenregistrement: event.dateLimiteDenregistrement
    })

  }

  updateCoaching(id) {
    let startDate = this.form.get('startDate').value;
    let endDate = this.form.get('dateFinFormation').value;
    let endSubscribeDate = this.form.get('dateLimiteDenregistrement').value;
    this.selectorCode();
    const formData = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('amount', this.form.get('amount').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('email', this.form.get('email').value);
    formData.append('devise', this.form.get('devise').value);
    formData.append('province', this.form.get('province').value);
    formData.append('commune',this.form.get('commune').value);
    formData.append('startDate', startDate);
    formData.append('type', this.form.get('type').value);
    formData.append('dateFinFormation', endDate);
    formData.append('builderName', this.form.get('builderName').value);
    formData.append('code', this.code);
    formData.append('frequency', this.form.get('frequency').value);
    formData.append('dateLimiteDenregistrement', endSubscribeDate);
    if(this.uploadedFile){
      formData.append('file',this.uploadedFile);
    }
    console.log(id)
     this.coachingService.updateCoaching(formData, id).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
        this.initForm();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );

  }



  // detail d'une coaching
  getCoaching(id){
    this.router.navigateByUrl('admin/coachings/details/'+id);
  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  onDelete() {
    this.coachingService.deleteCoaching(this.boutiqueRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }



  deleteCoachingSession(contentDeleteSession, event) {
    this.modalService.open(contentDeleteSession, {size: "lg"});
    this.sessionRef = event.id
  }

  onDeleteSession(){
    this.sessionService.deleteSessionCoaching(this.sessionRef).subscribe(
      res => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
      }, error => {
        this.messageService.add({severity:'error', summary: 'Erreur de suppression', detail: 'Message Content'});
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



  openAddCoachingSession(sessionAdd, currentCoaching){
    this.modalService.open(sessionAdd, { size: 'sm' });
  }


  findOneCoaching(contentUpdate:any, item:any){
    this.router.navigate(['/admin/coachings/details/'+item.id]);
  }


}
