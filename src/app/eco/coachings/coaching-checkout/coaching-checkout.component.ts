import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-coaching-checkout',
  templateUrl: './coaching-checkout.component.html',
  styleUrls: ['./coaching-checkout.component.scss']
})
export class CoachingCheckoutComponent implements OnInit {

  isBankPayment: boolean = false;
  isMobilePayment: boolean = false;
  order: any = {};
  constructor(private orderService: CommandeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrder(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bankPayment();
  }

  getOrder(id){
    this.orderService.getOne(id).subscribe(
      data => {
        this.order = data;
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
    this.orderService.checkout(this.order.id,'visa').subscribe(
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
    this.orderService.checkout(this.order.id,'masterCard').subscribe(
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
    this.orderService.checkout(this.order.id,'paypal').subscribe(
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
    this.orderService.checkout(this.order.id,'ecocash').subscribe(
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
    this.orderService.checkout(this.order.id,'lumicash').subscribe(
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
    this.orderService.checkout(this.order.id,'smartcash').subscribe(
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