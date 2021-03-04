import { error } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { ProductOrder } from '../models/product-order.model';
import { ProductOrders } from '../models/product-orders.model';
import { Product } from '../models/product.model';
import { OrdersComponent } from '../orders/orders.component';
import { EcommerceService } from '../services/ecommerce.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-men-products',
  templateUrl: './men-products.component.html',
  styleUrls: ['./men-products.component.css']
})
export class MenProductsComponent implements OnInit {

  productOrders: ProductOrder[] = [];
  products: Product[] = [];
  sorts: Product[] = [];
  marques: Product[] = [];
  allMarques: string[] = [];
  colors: Product [] = [];
  allColors: string[] = [];
  lists: Product[] = [];
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  sub: Subscription;
  productSelected: boolean = false;
  categories: any = {};

  p: number = 1;
  searchItem: string;

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;

  @ViewChild('ordersC')
  ordersC: OrdersComponent;

  orderFinished = false;

  constructor(private ecommerceService: EcommerceService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadOrders();
    this.categories = Object.keys(Category);
    this.loadMarques();
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

  loadMarques(){
    this.ecommerceService.getProductGenre('HOMME').subscribe(
      data => {
        this.lists = data;
        this.lists.forEach(element => {
        if(this.allMarques.includes(element.marque)){
          console.log('that element already contained');
        }else{
          this.allMarques.push(element.marque);
        }

        element.colors.forEach(color => {
          if(this.allColors.includes(color)){
            console.log('this element allready contains this color');
          }else{
            this.allColors.push(color);
          }
        });
        });
        console.log(this.allMarques);
        console.log(this.allColors);
      },
      error => {
        console.log(error);
      }
    );
  }
  
  loadProducts() {
    this.ecommerceService.getProductGenre('HOMME')
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

  sort(item){
    this.ecommerceService.getProductCategoryAndGenre(item,'HOMME').subscribe(
    
      (sorts: any[]) => {
        this.productOrders = [];
        this.sorts = sorts;
        this.sorts.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 1));
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  marque(item){
    this.ecommerceService.getProductMarqueAndGenre(item,'HOMME').subscribe(
    
      (marques: any[]) => {
        this.productOrders = [];
        this.marques = marques;
        this.marques.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 1));
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  color(item){
    this.ecommerceService.getProductColorAndGenre(item,'HOMME').subscribe(
    
      (colors: any[]) => {
        this.productOrders = [];
        this.colors = colors;
        this.colors.forEach(product => {
          this.productOrders.push(new ProductOrder(product, 1));
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  finishOrder(orderFinished: boolean) {
    this.orderFinished = orderFinished;
  }

}
