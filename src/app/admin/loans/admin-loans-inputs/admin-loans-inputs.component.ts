import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MicrofinanceService } from 'src/app/services/microfinance.service';
import { SessionCoachingService } from 'src/app/services/session-coaching.service';

@Component({
  selector: 'app-admin-loans-inputs',
  templateUrl: './admin-loans-inputs.component.html',
  styleUrls: ['./admin-loans-inputs.component.scss'],
  providers: [MessageService]
})
export class AdminLoansInputsComponent implements OnInit {

  lists: any = {};
  boutiqueRef
  sessionRef
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

 

}
