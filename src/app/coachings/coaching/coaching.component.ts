import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
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
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public coachingFormGroup?: FormGroup;
  public coachingUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public currentCoaching;
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
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.coachingFormGroup = new FormGroup({
      description: new FormControl(''),
      phone:  new FormControl(''),
      amount:  new FormControl(''),
      startDate: new FormControl(null),
      logo: new FormControl(null),
      email:  new FormControl(''),
      region:  new FormControl(''),
      title: new FormControl(''),
      userEmail: new FormControl('')
    });

    this.coachingUpdateFormGroup = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      phone:  new FormControl(''),
      phone1:  new FormControl(''),
      email:  new FormControl(''),
      region:  new FormControl(''),
      title: new FormControl(''),
      userEmail: new FormControl('')
    });
  }

  onFilesSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coachingFormGroup.get('logo').setValue(file);
    }
  }

  loadData() {
    this.coachingService.getAllCoaching().subscribe(
      data => {
        this.lists = data.body;
      }, error => {
        console.log(error);
      }
    );
  }

  saveCoaching() {

    if (this.coachingFormGroup?.invalid) return;

    console.log(this.coachingFormGroup);
    const formData = new FormData();
    formData.append('title', this.coachingFormGroup.get('title').value);
    formData.append('description', this.coachingFormGroup.get('description').value);
    formData.append('amount', this.coachingFormGroup.get('amount').value);
    formData.append('phone', this.coachingFormGroup.get('phone').value);
    formData.append('email', this.coachingFormGroup.get('email').value);
    formData.append('region', this.coachingFormGroup.get('region').value);
    formData.append('startDate', this.coachingFormGroup.get('startDate').value);
    formData.append('userEmail', this.coachingFormGroup.get('userEmail').value);
    formData.append('file', this.coachingFormGroup.get('logo').value);
    console.log(formData);
    this.submitted = true;
   
    this.coachingService.saveCoaching(formData).subscribe(
      (data: any) => {
        // this.router.navigateByUrl('/admin/boutiques');
        this.coachingFormGroup.reset();
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
    this.currentCoaching = event.region

    this.coachingUpdateFormGroup.patchValue({
      id: event.id,
      phone1: event.phone1,
      description: event.description,
      phone: event.phone,
      region: event.region,
      title: event.title,
      email: event.email,
      userEmail: event.userEmail
    });
  }

  updateCoaching() {
    const CompanyData = {
      id: this.coachingUpdateFormGroup.get('id').value,
      phone1: this.coachingUpdateFormGroup.get('phone1').value,
      description: this.coachingUpdateFormGroup.get('description').value,
      phone: this.coachingUpdateFormGroup.get('phone').value,
      region: this.coachingUpdateFormGroup.get('region').value,
      title: this.coachingUpdateFormGroup.get('title').value,
      email: this.coachingUpdateFormGroup.get('email').value,
      userEmail: this.coachingUpdateFormGroup.get('userEmail').value,

    }
    this.coachingService.updateCoaching(CompanyData).subscribe(
      (data: any) => {
        this.coachingUpdateFormGroup.reset();
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

  // detail d'une coaching
  getCoaching(){
    this.coachingService.getCoachingById(this.boutiqueRef).subscribe(

      data => {
        this.currentCoaching = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
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

  saveCoachingSession(){
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
