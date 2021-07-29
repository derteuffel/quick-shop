import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-loans-inputs-view',
  templateUrl: './loans-inputs-view.component.html',
  styleUrls: ['./loans-inputs-view.component.scss']
})
export class LoansInputsViewComponent implements OnInit {

  currentLoans: any = {};
  isBankPayment: boolean = false;
  isMobilePayment: boolean = false;

  constructor(
    private microFinancementService: MicrofinanceService,
              private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getLoans(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bankPayment();
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

  visaPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'visa').subscribe(
      data => {
        console.log('Checkout with visa successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }

  masterCardPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'masterCard').subscribe(
      data => {
        console.log('Checkout with master card successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }
  payPalPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'paypal').subscribe(
      data => {
        console.log('Checkout with Pay Pal successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }

  ecocashPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'ecocash').subscribe(
      data => {
        console.log('Checkout with ecocash successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }

  lumicashPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'lumicash').subscribe(
      data => {
        console.log('Checkout with lumicash successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }

  smartcashPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'smartcash').subscribe(
      data => {
        console.log('Checkout with smart cash successfuly');
        console.log(data);
        window.location.reload();
      },
      error =>{
        console.log(error);
      }
    );
  }
}
