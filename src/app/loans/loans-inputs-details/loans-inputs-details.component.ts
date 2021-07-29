import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-loans-inputs-details',
  templateUrl: './loans-inputs-details.component.html',
  styleUrls: ['./loans-inputs-details.component.scss']
})
export class LoansInputsDetailsComponent implements OnInit {


  currentLoans: any = {};
  isBankPayment: boolean = false;
  isMobilePayment: boolean = false;

  constructor(private microFinancementService: MicrofinanceService,
              private activatedRoute: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
                            private modalService: NgbModal,
                            private messageService: MessageService) { }

  ngOnInit(): void {
    this.getLoans(this.activatedRoute.snapshot.paramMap.get('id'));
    this.isBankPayment = true;
  }


  getLoans(id){
    this.microFinancementService.getFinance(id).subscribe(

      data => {
        this.currentLoans = data;
        console.log(data);
      }
    );
  }

  bankPayment(){
    this.isBankPayment = true;
    this.isMobilePayment = false;
  }

  mobilePayment(){
    this.isMobilePayment = true;
    this.isBankPayment = false;
  }

}
