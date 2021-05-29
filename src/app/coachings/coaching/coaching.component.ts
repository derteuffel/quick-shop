import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
import { Coaching } from 'src/app/models/coaching';
import {CoachingService} from "../../services/coaching.service";
import {SessionCoachingService} from "../../services/session-coaching.service";

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.scss'],
  providers: [MessageService],
})
export class CoachingComponent implements OnInit {

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

  saveCoaching(data) {

    console.log(data);
    console.log(this.uploadedFile)
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('amount', data.amount);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('region', data.region);
    formData.append('startDate', data.startDate);
    formData.append('userEmail', data.userEmail);
    formData.append('file', this.uploadedFile);
    console.log(formData);
    
    this.submitted = true;
     this.coachingService.saveCoaching(formData).subscribe(
      (data: any) => {
        // this.router.navigateByUrl('/admin/boutiques');
        console.log('je suis a interieur');
        
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

  /* saveCoachingSession(){
    this.sessionSubmitted = true;
    if (this.addCoachingSessionFurmGroup?.invalid) return;
    this.coachingService.saveCoaching(this.coachingFormGroup?.value).subscribe(
      (data: any) => {
        this.coachingFormGroup.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'coaching submitted', sticky: true});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.sessionSubmitted = false;
  } */

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
