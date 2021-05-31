import {Component, OnInit, ViewChild} from '@angular/core';
import {ShoppingCartComponent} from "../../shopping-cart/shopping-cart.component";
import {Error} from "tslint/lib/error";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductOrder} from "../../../models/product-order.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CoachingService} from "../../../services/coaching.service";
import {MicrofinanceService} from "../../../services/microfinance.service";

@Component({
  selector: 'app-microfinance-detail',
  templateUrl: './microfinance-detail.component.html',
  styleUrls: ['./microfinance-detail.component.scss']
})
export class MicrofinanceDetailComponent implements OnInit {

  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;
  currentMicroFinance: any;
  productOrder: ProductOrder[] = [] ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private modalService: NgbModal,
    private microFinanceService: MicrofinanceService) { }

  ngOnInit(): void {
    this.getMicroFinance(this.activatedRoute.snapshot.paramMap.get('id'));
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

}
