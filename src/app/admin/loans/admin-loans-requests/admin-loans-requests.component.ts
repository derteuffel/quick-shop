import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-admin-loans-requests',
  templateUrl: './admin-loans-requests.component.html',
  styleUrls: ['./admin-loans-requests.component.scss'],
  providers: [MessageService]
})
export class AdminLoansRequestComponent implements OnInit {

  lists: any = {};
  loans: any = {};
  loansRef: number;

  constructor(private loansService: LoansService,
    private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.loadData();
  }

  loadData() {
    this.loansService.getAllLoans().subscribe(
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
    
    this.loans = event;

  }

  // suppression d'une coaching

  deleteCoaching(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.loansRef = event.id;

  }

  onDelete() {
    this.loansService.delete(this.loansRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadData();
      }
    )
  }

  activate(contentActivation, event) {
    console.log(event)
    this.modalService.open(contentActivation, {size: "lg"});
    this.loansRef = event.id;

  }

  onActivate() {
    this.loansService.active(this.loansRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is activated successully', detail:'record action'});
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
