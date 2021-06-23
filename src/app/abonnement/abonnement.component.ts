import { Component, OnInit } from '@angular/core';
import {AbonnementService} from "../services/abonnement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BsModalService} from "ngx-bootstrap/modal";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SignUpInfo} from "../auth/requests/signup-info";
import {Abonnement} from "../models/abonnement";

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss'],
  providers: [MessageService],
})
export class AbonnementComponent implements OnInit {
  lists: any = [];
  types: string[];
  abonForm: FormGroup;
  form: any = {};
  abonnement: Abonnement
  public submitted: boolean = false;

  constructor(private abonnementService: AbonnementService,
              private router: Router,
              private fb: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,) { }

  ngOnInit(): void {

    this.types = [
      'PRODUCTS_SELLING',
      'COACHING_AND_SUPERVISION_SERVICE',
      'MICRO_FINANCEMENT'
    ]
  }

  loadData() {
    this.abonnementService.getAll().subscribe(
      data => {
        this.lists = data;
      }, error => {
        console.log(error);
      }
    );
  }
  /** ajouter un abonnement **/
  saveAbonnement() {
    console.log(this.form);
    this.abonnement = new Abonnement(
      this.form.startDate,
      this.form.endDate,
      this.form.type);
    console.log(this.abonnement);
    this.abonnementService.saveAbon(this.abonnement).subscribe(
      (data: any) => {
        //this.router.navigateByUrl('ecommerce/home');
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});

      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }


  /** ajouter un abonnement **/
 /* saveAbonnement(data) {

    console.log(data);
    const formData = new FormData();
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    //formData.append('endDate', data.endDate);

    formData.append('type', data.type);
    console.log(formData);

    this.submitted = true;
    this.abonnementService.saveAbon(formData).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }*/


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