import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoachingService} from "../../../services/coaching.service";
import {ProductOrder} from "../../../models/product-order.model";
import {Error} from "tslint/lib/error";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coaching-detail',
  templateUrl: './coaching-detail.component.html',
  styleUrls: ['./coaching-detail.component.scss']
})
export class CoachingDetailComponent implements OnInit {
  currentCoaching: any;
  numbers: number[];
  productOrder: ProductOrder[] = [] ;
  subscribeForm: FormGroup;

  constructor(
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private modalService: NgbModal,
              private coachingService: CoachingService) { }

  ngOnInit(): void {
    this.getCoaching(this.activatedRoute.snapshot.paramMap.get('id'));
    this.initForm();
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

  initForm(){
    this.subscribeForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      paymentMode: new FormControl('')
    });
  }

  onSaveSubscribe(){

  }

  setNumberList(){
    for(let i = 0; i < 1000; i++){
      this.numbers.push(i);
    }
  }

}
