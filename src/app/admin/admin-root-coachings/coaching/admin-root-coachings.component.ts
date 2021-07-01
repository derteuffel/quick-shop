import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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

  lists: any = [];
  types: string[];
  boutiqueRef;
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
    this.types = ['Travaux menagers', 'Etude et conseil( Ingenierie, Sous-traitance etc...)', 'Evenementiel', 'Mode et couture', 'Photographie et audiovisuel', 'Soutien scolaire','Agriculture','Elevage','Peche','Services techniques(Menuiserie, Plomberie, etc..)', 'Tableau, Peinture artistique','Sante', 'Offre d\'emploi','Autres'];
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
      email: new FormControl(''),
      amount: new FormControl(''),
      devise: new FormControl(''),
      startDate: new FormControl(null),
      description: new FormControl('')

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

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadedFile = file
    }
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

    
    console.log(this.uploadedFile)
    const formData = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('description', this.form.get('description').value);
    formData.append('amount', this.form.get('amount').value);
    formData.append('phone', this.form.get('phone').value);
    formData.append('email', this.form.get('email').value);
    formData.append('devise', this.form.get('devise').value);
    formData.append('region', this.form.get('province')+', '+this.form.get('commune').value);
    formData.append('startDate', this.form.get('startDate').value);
    formData.append('file', this.uploadedFile);
    console.log(formData);

    this.submitted = true;
     this.coachingService.saveCoaching(formData).subscribe(
      (data: any) => {
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
    this.currentCoaching = event;
    console.log(this.currentCoaching)
    this.form.patchValue({
      id: event.id,
      title: event.title,
      phone: event.phone,
      province: new FormControl(''),
      commune: new FormControl(''),
      email: event.email,
      amount: event.amount,
      devise: event.devise,
      startDate: event.startDate,
      description: event.description
    })

  }

  updateCoaching() {

    console.log('je suis la');
    console.log(this.form.value);
    const updateForm = {
      id: this.form.get('id').value,
      title: this.form.get('title').value,
      phone: this.form.get('phone').value,
      region: this.form.get('province').value+', '+this.form.get('commune').value,
      email: this.form.get('email').value,
      amount: this.form.get('amount').value,
      devise: this.form.get('devise').value,
      startDate: this.form.get('startDate').value,
      description: this.form.get('description').value
    }
     this.coachingService.updateCoaching(updateForm).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
        this.initForm();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    )
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
