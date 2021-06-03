import { Component, OnInit } from '@angular/core';
import {ProductOrder} from "../../models/product-order.model";
import {Product} from "../../models/product.model";
import {Subscription} from "rxjs/index";
import {ProductOrders} from "../../models/product-orders.model";
import {EcommerceService} from "../../services/ecommerce.service";
import {CoachingService} from "../../services/coaching.service";
import {Coaching} from "../../models/coaching";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {


  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  accessories: Product[] = [];
  accessoriesProduct: ProductOrder[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;

  navigationParams: any = {};


  constructor(
    private ecommerceService: EcommerceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.navigationParams = JSON.parse(params['values']);
    })
    console.log(this.navigationParams);
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
    this.loadAccessoriesProduct();
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
        (products: any[]) => {
          this.products = products;
          this.products.forEach(product => {
            this.productOrders.push(new ProductOrder(product, 1));
          });
        },
        (error) => console.log(error)
      );
  }


  loadAccessoriesProduct(){
    this.ecommerceService.getProductCategories('ACCESSOIRE').subscribe(
      (accessories: any[]) => {
        this.accessories = accessories;
        this.accessories.forEach(product => {
          this.accessoriesProduct.push(new ProductOrder(product, 1));
        });
        console.log(this.accessories);
      },
      error => {
        console.log(error);
      }
    );
  }


  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }

  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.loadOrders();
    this.productSelected = false;
  }
}
