import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../../eco/product/products/products.component';
import {ShoppingCartComponent} from '../../eco/shopping-cart/shopping-cart.component';
import {OrdersComponent} from '../../eco/orders/orders.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private collapsed = true;
  orderFinished = false;

  @ViewChild('productsC')
  productsC: ProductsComponent;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  constructor() { }

  ngOnInit(): void {
  }


  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }

}
