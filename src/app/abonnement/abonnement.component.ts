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
  abonnementId;
  public submitted: boolean = false;
  p = 1;
  searchItem: string;

  constructor(private abonnementService: AbonnementService,
              private router: Router,
              private fb: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loadData();

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

  openModalAddAbon(contentAddAbon){
    this.modalService.open(contentAddAbon, { size: 'lg' });
  }
  /** ajouter un abonnement **/
  saveAbonnement() {

    this.abonnementService.saveAbon(this.abonForm?.value).subscribe(
      (data: any) => {

        this.abonForm.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});
        this.loadData();
      }, error => {
        this.abonForm.reset();
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }

  // suppression d'un abonnement

  deleteAbon(contentDelete1, event) {
    this.modalService.open(contentDelete1, {size: 'lg'});
    this.abonnementId = event.id;
  }

  onDeleteAbon() {
    this.abonnementService.deleteOne(this.abonnementId).subscribe(
      (res: any) => {
        this.messageService.add({severity: 'success', summary: 'Account is deleted successully', detail: 'record delete'});
        this.loadData();
      }, error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Message Content'});
      }
    );
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
