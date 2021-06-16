import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ProductOrder} from '../../../models/product-order.model';
import {Product} from '../../../models/product.model';
import {ProductOrders} from '../../../models/product-orders.model';
import {CoachingService} from "../../../services/coaching.service";
import {Coaching} from "../../../models/coaching";
import {Microfinance} from "../../../models/microfinance";
import {MicrofinanceService} from "../../../services/microfinance.service";
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  
  sub: Subscription;
  productSelected: boolean = false;

  coachings: any = {};

  microfinances: any = {};

  constructor(
              private ecommerceService: EcommerceService,
              private coachingService: CoachingService,
              private loansService: LoansService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadCoachings();
    this.loadMicroFinancements();
  }

  

  loadProducts() {
    this.ecommerceService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        (error) => console.log(error)
      );
  }

  loadCoachings() {
    this.coachingService.getAllCoaching().subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  

  loadMicroFinancements() {
    this.loansService.getAllbyVisitor().subscribe(
      data => {
        this.microfinances = data;
        console.log(data);
      },
      (error) => console.log(error)
    )
  }


  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.productSelected = false;
  }

}
