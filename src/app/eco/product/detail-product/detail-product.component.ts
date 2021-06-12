import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { any } from 'codelyzer/util/function';
import { Subscription } from 'rxjs';
import { ProductOrder } from '../../../models/product-order.model';
import { ProductOrders } from '../../../models/product-orders.model';
import { Product } from '../../../models/product.model';
import { EcommerceService } from '../../../services/ecommerce.service';
import {CommandeService} from "../../../services/commande.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [MessageService],
})
export class DetailProductComponent implements OnInit {


  currentProduct: any;
  productOrder: ProductOrder[] = [] ;
  sub: Subscription;
  products: Product[] = [];
  productSelected: boolean = false;
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  orderFinished = false;

  orderForm: FormGroup;

  constructor(private ecommerceService: EcommerceService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private commandeService: CommandeService,
              private messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.productOrder = [];
  }

  loadProducts() {
    this.ecommerceService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }, error1 => {
        console.log(error1);
      }
    )
  }

  loadOrders() {
    this.sub = this.ecommerceService.OrdersChanged.subscribe(() => {
      this.shoppingCartOrders = this.ecommerceService.ProductOrders;
    });
  }
  getProduct(id): void{
    this.ecommerceService.getProductFree(id).subscribe(
        data => {
          this.currentProduct = data;
          console.log(data);
          //this.productOrder.push(new ProductOrder(this.currentProduct,1));
        },
        error => {
          console.log(Error);
        }
    );
  }

  initForm(){
    this.orderForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      quantity: new FormControl(''),
      paymentMode: new FormControl('')
    });
  }
  openModalFormulaire(contentAdd)  {
    this.modalService.open(contentAdd, {size: 'lg'});
   }

  addToCart(contentAdd, event) {
    this.modalService.open(contentAdd, {size: 'lg'});
    this.currentProduct = event
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

  onSaveSubscribe(){
    this.commandeService.saveCmd(this.orderForm?.value).subscribe(
      data => {
        this.orderForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'commande submitted', sticky: true});
        this.loadProducts();
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    )
  }

  /** toast message function primeng  **/
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

}
