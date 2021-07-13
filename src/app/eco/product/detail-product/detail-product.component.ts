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
import {Temoignage} from "../../../models/temoignage";
import {TemoignageService} from "../../../services/temoignage.service";

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
  providers: [MessageService],
})
export class DetailProductComponent implements OnInit {

  public submitted: boolean = false;
  currentProduct: any;
  productOrder: ProductOrder[] = [] ;
  sub: Subscription;
  products: Product[] = [];
  productSelected: boolean = false;
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  orderFinished = false;

  orderForm: FormGroup;
  temoignageForm: FormGroup;
  temoignage: Temoignage;
  constructor(private ecommerceService: EcommerceService,
              private temoignageService: TemoignageService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private commandeService: CommandeService,
              private messageService: MessageService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
    this.initForm2();
  }




  initForm2() {
    this.temoignageForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
      name: new FormControl(''),
    })
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
  openModalFormulaire(contentAdd, event)  {
    this.modalService.open(contentAdd, {size: 'lg'});
    this.currentProduct = event;
   }





  onSaveSubscribe(){
    const formData =  {
      clientName: this.orderForm.get('name').value,
      email: this.orderForm.get('email').value,
      clientPhone: this.orderForm.get('phone').value,
      quantity: this.orderForm.get('quantity').value,
      paymentMode: this.orderForm.get('paymentMode').value,
      lieuDeLivraison: this.orderForm.get('lieuDeLivraison').value,
      isProduit: true
    }
    this.commandeService.saveCmd(formData, this.currentProduct.id).subscribe(
      data => {
        this.orderForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'commande submitted', sticky: true});
        this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
        console.log(error);
      }
    )
  }


  saveTemoignage() {

    this.submitted = true;
    if(this.temoignageForm?.invalid){return;}

    this.temoignageService.createTemoignage(this.temoignageForm.value).subscribe(
      (data: any) => {
        this.temoignageForm.reset();
        this.router.navigate(["/ecommerce/home"]);
        this.messageService.add({severity:'success', summary:'Success', detail:'votre témoignage a été  soumit', sticky: true});

      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
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
