import { Component, OnInit } from '@angular/core';
import {AbonnementService} from "../services/abonnement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BsModalService} from "ngx-bootstrap/modal";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
  longers: string[];
  abonForm: FormGroup;
  form: any = {};
  p:number = 1;
  searchItem: string;
  abonnement: Abonnement
  abonnementId;
  public submitted: boolean = false;


  constructor(private abonnementService: AbonnementService,
              private router: Router,
              private fb: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,) { }

  ngOnInit(): void {
    this.loadData();

    this.longers = [
      '01 mois/2000 BIF(frais de renouvellement/mois 2000 BIF)',
      '03 mois/5000 BIF(frais de renouvellement/mois 1900 BIF)',
      '06 mois/9500 BIF(frais de renouvellement/mois 1800 BIF)',
      '12 mois/19500 BIF(frais de renouvellement/mois 1700 BIF)',
      '24 mois/44000 BIF(frais de renouvellement/mois 1600 BIF)',
      '36 mois/52000 BIF(frais de renouvellement/mois 1500 BIF)',

    ];

    this.form = new FormGroup(
      {
        longer: new FormControl(''),
        paiement: new FormControl('')
      }
    )
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
    console.log(this.form.value);
    
    console.log(this.abonnement);
     this.abonnementService.saveAbon(this.abonnement).subscribe(
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

  openModalAddAbon(contentAddAbon){
    this.modalService.open(contentAddAbon, { size: 'md' });
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
