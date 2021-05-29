import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ProductOrder} from '../../../models/product-order.model';
import {Product} from '../../../models/product.model';
import {ProductOrders} from '../../../models/product-orders.model';
import {CoachingService} from "../../../services/coaching.service";
import {Coaching} from "../../../models/coaching";

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

  coachings: Coaching[];

  constructor(
              private ecommerceService: EcommerceService,
              private coachingService: CoachingService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
    this.loadAccessoriesProduct();
    this.loadCoachings();
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

  loadCoachings() {
    this.coachingService.getAllCoaching().subscribe(
      (res: any) => {
        this.coachings = res;
      }
    )
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
