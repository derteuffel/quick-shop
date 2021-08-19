import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coaching } from 'src/app/models/coaching';
import { Product } from 'src/app/models/product.model';
import { AccountService } from 'src/app/services/account.service';
import { CoachingService } from 'src/app/services/coaching.service';
import { EcommerceService } from 'src/app/services/ecommerce.service';
import { LoansService } from 'src/app/services/loans.service';
import { MicrofinanceService } from 'src/app/services/microfinance.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  user: any = {};
  p:number = 1;
  searchItem: string ='';
  isProduit: boolean;
  isCoaching: boolean;
  isInvestment: boolean;
  isLoans: boolean;
  isOrder: boolean;
  products: any ={};
  product: Product;
  coachings: any = {};
  coaching: Coaching;
  invests: any = {};
  currentLoans: any;

  loanses: any = {};
  loans : any;

  constructor(private userService: AccountService, private activatedRoute: ActivatedRoute,
    private modalService: NgbModal, private coachingService: CoachingService, private produitService: EcommerceService,
    private loansService: LoansService, private investService: MicrofinanceService) { }

  ngOnInit(): void {
    this.getUserDetails(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getProduit(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getUserDetails(id){
    this.userService.getOne(id).subscribe(
      data => {
        this.user = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getOrder(id){
    this.isOrder = true;
    this.isProduit = false;
    this.isInvestment = false;
    this.isLoans = false;
    this.isCoaching = false;
  }
  getProduit(id){
    this.isOrder = false;
    this.isProduit = true;
    this.isInvestment = false;
    this.isLoans = false;
    this.isCoaching = false;
    this.produitService.getAllProductsByUser(id).subscribe(
      data => {
        this.products = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  getCoaching(id){
    this.isOrder = false;
    this.isProduit = false;
    this.isInvestment = false;
    this.isLoans = false;
    this.isCoaching = true;

    this.coachingService.getAllCoachingByUserUnique(id).subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getInvestment(id){
    this.isOrder = false;
    this.isProduit = false;
    this.isInvestment = true;
    this.isLoans = false;
    this.isCoaching = false;

    this.investService.getAllFinanceByUser(id).subscribe(
      data => {
        this.invests = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  getLoans(id){
    this.isOrder = false;
    this.isProduit = false;
    this.isInvestment = false;
    this.isLoans = true;
    this.isCoaching = false;

    this.loansService.getAllbyUser(id).subscribe(
      data => {
        this.loanses = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  setProduct(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: 'lg'});
    this.product = event;

  }

  setCoaching(contentUpdate, event) {

    this.modalService.open(contentUpdate, {size: "lg"});
    this.coaching = event;
    

  }

  setInvest(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    
    this.currentLoans = event;

  }

  setloans(contentLoans, event){
    console.log(event)
    this.modalService.open(contentLoans, {size: "lg"});

    this.loans = event;

  }

}
