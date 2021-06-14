import {Component, OnInit, ViewChild} from '@angular/core';
import {Error} from "tslint/lib/error";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductOrder} from "../../../models/product-order.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CoachingService} from "../../../services/coaching.service";
import {MicrofinanceService} from "../../../services/microfinance.service";
import {MessageService} from "primeng/api";
import {Product} from "../../../models/product.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EcommerceService} from "../../../services/ecommerce.service";
import {CommandeService} from "../../../services/commande.service";

@Component({
  selector: 'app-microfinance-detail',
  templateUrl: './microfinance-detail.component.html',
  styleUrls: ['./microfinance-detail.component.scss'],
  providers: [MessageService],
})
export class MicrofinanceDetailComponent implements OnInit {


  currentMicroFinance: any;
  productOrder: ProductOrder[] = [] ;
  products: Product[] = [];
  subscribeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private ecommerceService: EcommerceService,
    private commandeService: CommandeService,
    private messageService: MessageService,
    private modalService: NgbModal,
    private microFinanceService: MicrofinanceService) { }

  ngOnInit(): void {
    this.getMicroFinance(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
  }

  getMicroFinance(id): void{
    this.microFinanceService.getFinance(id).subscribe(
      data => {
        this.currentMicroFinance = data;
        console.log(data);
      },
      error => {
        console.log(Error);
      }
    );
  }

  openModalFormulaire(contentAdd)  {
    this.modalService.open(contentAdd, {size: 'lg'});
  }
  initForm(){
    this.subscribeForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      paymentMode: new FormControl('')
    });
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
  onSaveSubscribe(){
    this.commandeService.saveCmd(this.subscribeForm?.value).subscribe(
      data => {
        this.subscribeForm.reset();
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'commande submitted', sticky: true});
        this.getMicroFinance(this.activatedRoute.snapshot.paramMap.get('id'));
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
