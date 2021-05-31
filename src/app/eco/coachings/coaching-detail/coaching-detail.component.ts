import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoachingService} from "../../../services/coaching.service";
import {ProductOrder} from "../../../models/product-order.model";
import {ShoppingCartComponent} from "../../shopping-cart/shopping-cart.component";
import {Error} from "tslint/lib/error";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-coaching-detail',
  templateUrl: './coaching-detail.component.html',
  styleUrls: ['./coaching-detail.component.scss']
})
export class CoachingDetailComponent implements OnInit {
  @ViewChild('shoppingCartC')
  shoppingCartC: ShoppingCartComponent;
  currentCoaching: any;
  productOrder: ProductOrder[] = [] ;

  constructor(
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private modalService: NgbModal,
              private coachingService: CoachingService) { }

  ngOnInit(): void {
    this.getCoaching(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  getCoaching(id): void{
    this.coachingService.getCoachingById(id).subscribe(
      data => {
        this.currentCoaching = data;
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
