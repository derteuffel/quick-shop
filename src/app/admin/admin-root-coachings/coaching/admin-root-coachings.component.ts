import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
import { Coaching } from 'src/app/models/coaching';
import { CoachingService } from 'src/app/services/coaching.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';


@Component({
  selector: 'app-admin-root-coachings',
  templateUrl: './admin-root-coachings.component.html',
  styleUrls: ['./admin-root-coachings.component.scss'],
  providers: [MessageService],
})
export class AdminRootCoachingsComponent implements OnInit {

  lists: any = [];
  boutiqueRef;
  sessionRef
  p: number = 1;
  searchItem: string;
  uploadedFile: File = null;
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public coachingUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public currentCoaching: Coaching;
  public currentSession;
  communes: string[];
  provinces: string[];
  constructor(              private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private fb: FormBuilder,
                            private router: Router,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadData();
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
  saveCoaching(data) {

    console.log(data);
    console.log(this.uploadedFile)
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('amount', data.amount);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('devise',data.devise);
    formData.append('region', data.province+', '+data.commune);
    formData.append('startDate', data.startDate);
    formData.append('userEmail', data.userEmail);
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

  }

  updateCoaching() {

    console.log('je suis la');
    console.log(this.currentCoaching);


     this.coachingService.updateCoaching(this.currentCoaching).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadData();
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
