import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {EcommerceService} from '../../../services/ecommerce.service';
import {ProductOrder} from '../../../models/product-order.model';
import {Product} from '../../../models/product.model';
import {ProductOrders} from '../../../models/product-orders.model';
import {CoachingService} from "../../../services/coaching.service";
import {Coaching} from "../../../models/coaching";
import {Microfinance} from "../../../models/microfinance";
import {MicrofinanceService} from "../../../services/microfinance.service";
import { LoansService } from 'src/app/services/loans.service';
import {MessageService, PrimeNGConfig} from "primeng/api";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AbonnementService} from "../../../services/abonnement.service";
import {Temoignage} from "../../../models/temoignage";
import {TemoignageService} from "../../../services/temoignage.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService],
})
export class ProductsComponent implements OnInit {
  public submitted: boolean = false;

  productOrders: ProductOrder[] = [];
  products: Product[] = [];

  sub: Subscription;
  productSelected: boolean = false;

  coachings: any = {};

  microfinances: any = {};

  temoignageForm: FormGroup;
  form: any = {};
  temoignage: Temoignage;

  constructor(private abonnementService: AbonnementService,
              private temoignageService: TemoignageService,
              private router: Router,
              private fb: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,
              private ecommerceService: EcommerceService,
              private coachingService: CoachingService,
              private loansService: LoansService) { }

  ngOnInit(): void {
    this.productOrders = [];
    this.loadProducts();
    this.loadCoachings();
    this.loadMicroFinancements();
    this.initForm();
  }



  loadProducts() {
    this.ecommerceService.getAllProducts()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
        },
        (error) => console.log(error)
      );
  }

  loadCoachings() {
    this.coachingService.getAllCoaching().subscribe(
      data => {
        this.coachings = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }



  loadMicroFinancements() {
    this.loansService.getAllbyVisitor().subscribe(
      data => {
        this.microfinances = data;
        console.log(data);
      },
      (error) => console.log(error)
    )
  }


  reset() {
    this.productOrders = [];
    this.loadProducts();
    this.ecommerceService.ProductOrders.productOrders = [];
    this.productSelected = false;
  }


  initForm() {
    this.temoignageForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl(''),
      name: new FormControl(''),
    })
  }


  /** ajouter un temoignage **/

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


  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }

  onBack(){
    this.router.navigateByUrl('admin/home');
  }

}
