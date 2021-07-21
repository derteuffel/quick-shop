import {Component, OnInit, ViewChild} from '@angular/core';
import {Error} from "tslint/lib/error";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductOrder} from "../../../models/product-order.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CoachingService} from "../../../services/coaching.service";
import {MicrofinanceService} from "../../../services/microfinance.service";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Product} from "../../../models/product.model";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EcommerceService} from "../../../services/ecommerce.service";
import {CommandeService} from "../../../services/commande.service";
import { LoansService } from 'src/app/services/loans.service';
import {Temoignage} from "../../../models/temoignage";
import {BsModalService} from "ngx-bootstrap/modal";
import {TemoignageService} from "../../../services/temoignage.service";

@Component({
  selector: 'app-microfinance-detail',
  templateUrl: './microfinance-detail.component.html',
  styleUrls: ['./microfinance-detail.component.scss'],
  providers: [MessageService],
})
export class MicrofinanceDetailComponent implements OnInit {
  temoignageForm: FormGroup;
  form: any = {};
  temoignage: Temoignage;
  public submitted: boolean = false;

  currentMicroFinance: any={};
  subscribeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private temoignageService: TemoignageService,
    private router: Router,
    private fb: FormBuilder,
    private primengConfig: PrimeNGConfig,
    private modalService: NgbModal,
    private modalService2: BsModalService,
    private messageService: MessageService,
    private loansService: LoansService) { }

  ngOnInit(): void {
    this.getMicroFinance(this.activatedRoute.snapshot.paramMap.get('id'));

  }

  getMicroFinance(id): void{
    this.loansService.getOne(id).subscribe(
      data => {
        this.currentMicroFinance = data;
        console.log(data);
      },
      error => {
        console.log(Error);
      }
    );
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
