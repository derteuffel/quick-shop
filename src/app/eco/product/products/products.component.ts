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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  accessories: Product[] = [];
  accessoriesProduct: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;

  coachings: any = {};

  microfinances: any = {};

  constructor(
              private ecommerceService: EcommerceService,
              private coachingService: CoachingService,
              private microFinanceService: MicrofinanceService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadCoachings();
    this.loadMicroFinancements();
  }

  addToCart(order: ProductOrder) {
    this.ecommerceService.SelectedProductOrder = order;
    this.selectedProductOrder = this.ecommerceService.SelectedProductOrder;
    this.productSelected = true;
    console.log(this.selectedProductOrder);
    console.log("i selected item");
  }

  removeFromCart(productOrder: ProductOrder) {
    let index = this.getProductIndex(productOrder.product);
    if (index > -1) {
      this.shoppingCartOrders.productOrders.splice(
        this.getProductIndex(productOrder.product), 1);
    }
    this.ecommerceService.ProductOrders = this.shoppingCartOrders;
    this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    this.productSelected = false;
  }

  getProductIndex(product: Product): number {
    return this.ecommerceService.ProductOrders.productOrders.findIndex(
      value => value.product === product);
  }

  isProductSelected(product: Product): boolean {
    return this.getProductIndex(product) > -1;
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
    this.microFinanceService.getAllFinance().subscribe(
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
