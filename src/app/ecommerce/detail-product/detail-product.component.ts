import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { any } from 'codelyzer/util/function';
import { Subscription } from 'rxjs';
import { ProductOrder } from '../models/product-order.model';
import { ProductOrders } from '../models/product-orders.model';
import { Product } from '../models/product.model';
import { EcommerceService } from '../services/ecommerce.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;
  currentProduct: any;
  productOrder: ProductOrder[] = [] ;
  sub: Subscription;
  productSelected: boolean = false;
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  orderFinished = false;

  constructor(private ecommerceService: EcommerceService, private activatedRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productOrder = [];
  }

  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }
  getProduct(id): void{
    this.ecommerceService.getProduct(id).subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
          this.productOrder.push(new ProductOrder(this.currentProduct,1));
        },
        error => {
          console.log(Error);
        }
    );
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

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

}
