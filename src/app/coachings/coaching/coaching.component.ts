import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {CoachingService} from "../../services/coaching.service";

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.scss'],
  providers: [MessageService],
})
export class CoachingComponent implements OnInit {

  lists: any = [];
  boutiqueRef;
  p: number = 1;
  searchItem: string;
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public coachingFormGroup?: FormGroup;
  public coachingUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public currentCoaching;
  constructor(              private coachingService: CoachingService,
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
      phone1:  new FormControl(''),
      email:  new FormControl(''),
      region:  new FormControl(''),
      title: new FormControl(''),
      userEmail: new FormControl('')
    });

    this.coachingUpdateFormGroup = new FormGroup({
      description: new FormControl(''),
      phone:  new FormControl(''),
      phone1:  new FormControl(''),
      email:  new FormControl(''),
      region:  new FormControl(''),
      title: new FormControl(''),
      userEmail: new FormControl('')
    });
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
    this.submitted = true;
    if (this.coachingFormGroup?.invalid) return;
    this.coachingService.saveCoaching(this.coachingFormGroup?.value).subscribe(
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

  saveCoachingSession(){
    this.sessionSubmitted = true;
    if (this.addCoachingSessionFurmGroup?.invalid) return;
    this.coachingService.saveCoaching(this.coachingFormGroup?.value).subscribe(
      (data: any) => {
        // this.router.navigateByUrl('/admin/boutiques');
        this.coachingFormGroup.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'coaching submitted', sticky: true});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.sessionSubmitted = false;
  }

}
