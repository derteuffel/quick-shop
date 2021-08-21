import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-loans-inputs-view',
  templateUrl: './loans-inputs-view.component.html',
  styleUrls: ['./loans-inputs-view.component.scss'],
  providers: [MessageService]
})
export class LoansInputsViewComponent implements OnInit {

  currentLoans: any = {};
  isBankPayment: boolean = false;
  isMobilePayment: boolean = false;
  isCashPayment: boolean = false;
  strikeCheckout:any = null;

  constructor(
    private microFinancementService: MicrofinanceService,
              private activatedRoute: ActivatedRoute, private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getLoans(this.activatedRoute.snapshot.paramMap.get('id'));
    this.bankPayment();
    this.stripePaymentGateway();
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
    this.isCashPayment = false;
  }

  mobilePayment(){
    this.isMobilePayment = true;
    this.isBankPayment = false;
    this.isCashPayment = false;
  }
  cashPayment(){
    this.isMobilePayment = false;
    this.isBankPayment = false;
    this.isCashPayment = true;
  }


submit(method){
  this.microFinancementService.checkoutLoans(method, this.currentLoans.id).subscribe(
    data => {
      console.log('Checkout with visa successfuly');
      console.log(data);
      this.messageService.add({severity:'success', summary:'Success', detail:'votre Paiement a ete effectuer, vous allez recevoir une confirmation par mail avec les detail de votre commande', sticky: true});
      window.location.reload();
    },
    error =>{
      console.log(error);
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Echec de la transaction, veuillez reesayer, ou alors contacter votre fournisseur de devise'});
    }
  );
}

 
  stripePayment(){
    switch(this.currentLoans.devise){
      case 'EURO':{
        this.checkout(this.currentLoans.amount*1.17);
       
        break;
      }
      case 'BIF':{
        this.checkout(this.currentLoans.amount*0.00050);
        break;
      }
      case 'Shilling':{
        this.checkout(this.currentLoans.amount*0.0092);
        break;
      }
      case 'FCFA':{
        this.checkout(this.currentLoans.amount*0.0018);
        break;
      }
    
      case 'FC':{
        this.checkout(this.currentLoans.amount*0.00050);
        break;
      }
    
      default : {
        this.checkout(this.currentLoans.amount);
        break;
      }
    
    }
    
    console.log('jai fini');
  }

  ecocashPayment(){
    /* switch(this.order.devise){
      case 'EURO':{
        this.checkout(this.order.amount*1.17);
       
        break;
      }
      case 'BIF':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
      case 'Shilling':{
        this.checkout(this.order.amount*0.0092);
        break;
      }
      case 'FCFA':{
        this.checkout(this.order.amount*0.0018);
        break;
      }
    
      case 'FC':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
    
      default : {
        this.checkout(this.order.amount);
        break;
      }
    
    } */
    this.submit('ecocash');
    console.log('jai fini');
  }
  liquidPayment(){
    this.microFinancementService.checkoutLoans(this.currentLoans.id,'reservation').subscribe(
      data => {
        console.log('Checkout with ecocash successfuly');
        console.log(data);
        this.messageService.add({severity:'success', summary:'Success', detail:'votre Paiement a ete effectuer, vous allez recevoir une confirmation par mail avec les detail de votre commande', sticky: true});
        window.location.reload();
      },
      error =>{
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Echec de la transaction, veuillez reesayer, ou alors contacter votre fournisseur de devise'});
      }
    );
  }

  lumicashPayment(){
    /* switch(this.order.devise){
      case 'EURO':{
        this.checkout(this.order.amount*1.17);
       
        break;
      }
      case 'BIF':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
      case 'Shilling':{
        this.checkout(this.order.amount*0.0092);
        break;
      }
      case 'FCFA':{
        this.checkout(this.order.amount*0.0018);
        break;
      }
    
      case 'FC':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
    
      default : {
        this.checkout(this.order.amount);
        break;
      }
    
    } */
    this.submit('lumicash');
    console.log('jai fini');
  }

  smartcashPayment(){
    /* switch(this.order.devise){
      case 'EURO':{
        this.checkout(this.order.amount*1.17);
       
        break;
      }
      case 'BIF':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
      case 'Shilling':{
        this.checkout(this.order.amount*0.0092);
        break;
      }
      case 'FCFA':{
        this.checkout(this.order.amount*0.0018);
        break;
      }
    
      case 'FC':{
        this.checkout(this.order.amount*0.00050);
        break;
      }
    
      default : {
        this.checkout(this.order.amount);
        break;
      }
    
    } */
    this.submit('smartcash');
  }


  checkout(amount) {
    const strikeCheckout = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51JD9IPAoNPp92zYvk26XBRunJi1ioCQd6owmCcah1bFxgZnHFvYo7HXlKQW1kUoMMFylW9lIWQZCued2tnvOgmp800IxMALlLO',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
        alert('Stripe token generated!');
      }
    });
  
    strikeCheckout.open({
      name: 'Payment Gateway',
      description: 'Payment widgets',
      amount: amount * 100
    });
  }

  stripePaymentGateway() {
    if(!window.document.getElementById('stripe-script')) {
      const scr = window.document.createElement("script");
      scr.id = "stripe-script";
      scr.type = "text/javascript";
      scr.src = "https://checkout.stripe.com/checkout.js";

      scr.onload = () => {
        this.strikeCheckout = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51JD9IPAoNPp92zYvk26XBRunJi1ioCQd6owmCcah1bFxgZnHFvYo7HXlKQW1kUoMMFylW9lIWQZCued2tnvOgmp800IxMALlLO',
          locale: 'auto',
          token: function (token: any) {
            console.log(token)
            alert('Payment via stripe successfull!');
            this.submit('stripe');
          }
        });
      }
        
      window.document.body.appendChild(scr);
    }
  }
}
