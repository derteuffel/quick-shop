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
import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-microfinance-detail',
  templateUrl: './microfinance-detail.component.html',
  styleUrls: ['./microfinance-detail.component.scss'],
  providers: [MessageService],
})
export class MicrofinanceDetailComponent implements OnInit {


  currentMicroFinance: any={};
  subscribeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private modalService: NgbModal,
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

  /* onSaveSubscribe(){
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
  } */



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
