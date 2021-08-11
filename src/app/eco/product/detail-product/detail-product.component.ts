import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  intervalsHours : string[];
  productSelected: boolean = false;
  selectedProductOrder: ProductOrder;
  private shoppingCartOrders: ProductOrders;
  orderFinished = false;
  id:number;
  message: string;
  subscription: Subscription;
  @Input() productId = any;

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
    //console.log(this.productId);
    this.getProduct(this.productId);
    this.initForm();
    this.initForm2();
    this.intervalsHours = ['07:00 am - 10:00 am','10:01 am - 1:00 pm ','1:01 pm - 4:00 pm','4:01 pm - 7:00 pm']
  }

  receivename($event: number) {
    this.id = $event;
    console.log(this.id);
    this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
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
      lieuDeLivraison: new FormControl(''),
      dateDeLivraison: new FormControl(''),
      heureDeLivraison: new FormControl(''),
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
      heureDeLivraison: this.orderForm.get('heureDeLivraison').value,
      dateDeLivraison: this.orderForm.get('dateDeLivraison').value,
      isProduit: true
    }
    this.commandeService.saveCmd(formData, this.currentProduct.id).subscribe(
      data => {
        this.orderForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Votre commande a ete soumise vous serez rediriger vers la page de paiement', sticky: true});
        this.getProduct(this.activatedRoute.snapshot.paramMap.get('id'));
        this.router.navigateByUrl('ecommerce/produit/checkout/'+data.id);
      },
      error => {
        console.log(error.error);
        let excp:string = 'https://www.jhipster.tech/problem/problem-with-message There are not enougth product for this command com.derteuffel.springbootecommerce.services.CommandeService quantity greater than stock';
        this.messageService.add({severity: 'error', summary: 'Error', detail: (error.error.message==excp)? 'Qauntité de produit insufusante':'Unknow error'});
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
