import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {EcommerceService} from '../../services/ecommerce.service';
import {ProductOrders} from '../../models/product-orders.model';
import { error } from 'protractor';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {


  orders: ProductOrders;
  sousTotal: number;
  total: number;
  paid: boolean;
  sub: Subscription;
  constructor(private ecommerceService: EcommerceService) {
    this.orders = ecommerceService.ProductOrders;
  }

  ngOnInit(): void {
    this.paid = false;
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.orders = this.ecommerceService.ProductOrders;
    });
    this.loadTotal();
  }

  pay() {
    this.paid = true;
    this.ecommerceService.saveOrder(this.orders).subscribe(
      data => {
        console.log('je contient :'+this.orders);
      }, error => {
        console.log(error);
      }
    );
    //console.log(this.orders);
  }

  loadTotal() {
    this.sub = this.ecommerceService.TotalChanged.subscribe(() => {
      this.sousTotal = this.ecommerceService.Total;
    });
  }

  livraison(number){
    this.total = this.sousTotal+number;
    console.log('selected'+ this.total);
  }

}
