import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsComponent} from '../../ecommerce/products/products.component';
import {ShoppingCartComponent} from '../../ecommerce/shopping-cart/shopping-cart.component';
import {OrdersComponent} from '../../ecommerce/orders/orders.component';

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



  reset() {
    this.orderFinished = false;
    this.productsC.reset();
    this.shoppingCartC.reset();
    this.ordersC.paid = false;
  }

}
