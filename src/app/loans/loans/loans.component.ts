import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
  providers: [MessageService]
})
export class LoansComponent implements OnInit {

  lists: any = {};
  boutiqueRef
  sessionRef
  p: number = 1;
  searchItem: string;
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public coachingFormGroup?: FormGroup;
  public coachingUpdateFormGroup?: FormGroup;
  public addCoachingSessionFurmGroup?: FormGroup;
  public currentLoans;
  public currentSession;
  constructor(              //private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private microfinancementService: MicrofinanceService,
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
      region: new FormControl(''),
      amount:  new FormControl(''),
      bankName:  new FormControl(''),
      paymentMode:  new FormControl(''),
      userEmail: new FormControl(''),
      userName: new FormControl(''),
      userPhone: new FormControl(''),
      devise: new FormControl('')
    });

    this.coachingUpdateFormGroup = new FormGroup({
      id: new FormControl(''),
      region: new FormControl(''),
      amount:  new FormControl(''),
      bankName:  new FormControl(''),
      paymentMode:  new FormControl(''),
      userEmail: new FormControl(''),
      userName: new FormControl(''),
      userPhone: new FormControl(''),
      devise: new FormControl('')
    });
  }

  loadData() {
    this.microfinancementService.getAllFinance().subscribe(
      data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  saveCoaching() {
    this.submitted = true;
    if (this.coachingFormGroup?.invalid) return;
    console.log(this.coachingFormGroup.value);
     this.microfinancementService.saveFinance(this.coachingFormGroup?.value).subscribe(
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
    this.currentLoans = event;

    this.coachingUpdateFormGroup.patchValue({
      id: event.id,
      region: event.region,
      amount:  event.amount,
      bankName:  event.bankName,
      paymentMode:  event.paymentMode,
      userEmail: event.userEmail,
      userName: event.userName,
      userPhone: event.userPhone,
      devise: event.devise
    });
  }

  getLoans(contentDetails, event) {

    this.modalService.open(contentDetails, {size: "lg"});
    this.currentLoans = event;
  }

  updateCoaching() {
    const updateData = {
      id: this.coachingUpdateFormGroup.get('id').value,
      amount: this.coachingUpdateFormGroup.get('amount').value,
      bankName: this.coachingUpdateFormGroup.get('bankName').value,
      paymentMode: this.coachingUpdateFormGroup.get('paymentMode').value,
      region: this.coachingUpdateFormGroup.get('region').value,
      userEmail: this.coachingUpdateFormGroup.get('userEmail').value,
      userName: this.coachingUpdateFormGroup.get('userName').value,
      userPhone: this.coachingUpdateFormGroup.get('userPhone').value,
      devise: this.coachingUpdateFormGroup.get('devise').value

    }

    console.log(updateData);
    this.microfinancementService.updateFinance(updateData).subscribe(
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

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  onDelete() {
    this.microfinancementService.deleteFinance(this.boutiqueRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }

  saveCoachingSession(){
    this.sessionSubmitted = true;
    if (this.addCoachingSessionFurmGroup?.invalid) return;
    this.microfinancementService.deleteFinance(this.coachingFormGroup?.value).subscribe(
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


  findOneCoaching(item){
    this.router.navigate(['/admin/loans/details /'+item.id]);
  }

}