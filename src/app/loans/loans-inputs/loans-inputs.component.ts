import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomerInfo } from 'src/app/auth/requests/customer-info';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-loans-inputs',
  templateUrl: './loans-inputs.component.html',
  styleUrls: ['./loans-inputs.component.scss'],
  providers: [MessageService]
})
export class LoansInputsComponent implements OnInit {

  lists: any = {};
  boutiqueRef
  sessionRef
  form: any = {};
  signupInfo: CustomerInfo;
  p: number = 1;
  searchItem: string;
  public submitted: boolean = false;
  public sessionSubmitted: boolean = false;
  public currentLoans;
  public currentSession;
  constructor(              //private coachingService: CoachingService,
                            private sessionService: SessionCoachingService,
                            private microfinancementService: MicrofinanceService,
                            private fb: FormBuilder,
                            private router: Router,
                            private authService: AuthService,
                            private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadData();
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

  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    this.boutiqueRef = event.id
    this.currentLoans = event;
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

  onSubmit(){
    this.signupInfo = new CustomerInfo(
      this.authService.currentUserValue.fullName,
      this.authService.currentUserValue.email,
      '',
      this.authService.currentUserValue.phone,
      this.form.devise,
      this.authService.currentUserValue.idNumber,
      this.form.amount,
      this.form.method);
    this.microfinancementService.saveFinance(this.signupInfo).subscribe(
      data => {
        console.log(data);
        
        if(this.signupInfo.paymentMethod === 'VB'){
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }else if(this.signupInfo.paymentMethod === 'MM'){
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }else{
          this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});
        }
        this.messageService.add({severity:'success', summary:'Success', detail:'votre demande a été  soumisse, veillez verifier votre boite email', sticky: true});

      },
      error => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
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
