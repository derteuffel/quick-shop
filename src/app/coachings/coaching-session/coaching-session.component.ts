import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {SessionCoachingService} from "../../services/session-coaching.service";

@Component({
  selector: 'app-coaching-session',
  templateUrl: './coaching-session.component.html',
  styleUrls: ['./coaching-session.component.scss'],
  providers: [MessageService],
})
export class CoachingSessionComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;
  boutiqueRef;
  public submitted: boolean = false;
  public sessionFormGroup?: FormGroup;
  public sessionUpdateFormGroup?: FormGroup;
  public currentSession;
  constructor(              private sessionService: SessionCoachingService,
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
    this.sessionFormGroup = new FormGroup({
      label: new FormControl(''),
      startDate:  new FormControl(''),
      endDate:  new FormControl(''),
    });
  }

  loadData() {
    this.sessionService.getAllSessionCoaching().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);

      }
    )
  }

  saveCoaching() {
    this.submitted = true;
    if (this.sessionFormGroup?.invalid) return;
    this.sessionService.saveSessionCoaching(this.sessionFormGroup?.value).subscribe(
      (data: any) => {
        this.sessionFormGroup.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'session coaching submitted', sticky: true});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }


  setCoaching(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentSession = event.region
    this.sessionUpdateFormGroup.patchValue({
      id: event.id,
      label: event.label,
      startDate: event.startDate,
      endDate: event.endDate,

    });

  }

  updateCoaching() {
    const CompanyData = {
      id: this.sessionUpdateFormGroup.get('id').value,
      label: this.sessionUpdateFormGroup.get('label').value,
      startDate: this.sessionUpdateFormGroup.get('startDate').value,
      endDate: this.sessionUpdateFormGroup.get('endDate').value,

    }
    this.sessionService.updateSessionCoaching(CompanyData).subscribe(
      (data: any) => {
        this.sessionUpdateFormGroup.reset();
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
    this.sessionService.getSessionCoaching(this.boutiqueRef).subscribe(

      data => {
        this.currentSession = data;
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
    this.sessionService.deleteSessionCoaching(this.boutiqueRef).subscribe(
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
