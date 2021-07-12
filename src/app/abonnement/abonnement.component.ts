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
  public submitted: boolean = false;

  constructor(private abonnementService: AbonnementService,
              private router: Router,
              private fb: FormBuilder,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private modalService2: BsModalService,
              private messageService: MessageService,) { }

  ngOnInit(): void {

    this.longers = [
      '01 mois/2000 BIF(frais de renouvellement/mois 2000 BIF)',
      '03 mois/5000 BIF(frais de renouvellement/mois 1900 BIF)',
      '06 mois/9500 BIF(frais de renouvellement/mois 1800 BIF)',
      '12 mois/19500 BIF(frais de renouvellement/mois 1700 BIF)',
      '24 mois/44000 BIF(frais de renouvellement/mois 1600 BIF)',
      '36 mois/52000 BIF(frais de renouvellement/mois 1500 BIF)',

    ];

/*    this.form = new FormGroup(
      {
        longer: new FormControl(''),
        paiement: new FormControl('')
      }
    )*/
    this.initForm();

    this.loadData();
  }

  initForm(){
    this.abonForm = new FormGroup({
      id: new FormControl(''),
      longer: new FormControl(''),
      paiement: new FormControl('')

    })

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
     this.abonnementService.saveAbon(this.abonForm?.value).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'votre abonnement a été  soumit', sticky: true});
        this.abonForm.reset();
        this.loadData();

      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }


  /** ajouter un abonnement **/
  saveAbon() {

    this.submitted = true;
    if(this.abonForm?.invalid){return;}

    this.abonnementService.saveAbon(this.abonForm.value).subscribe(
      (data: any) => {
        this.abonForm.reset();
        console.log(this.abonForm.value);
        this.messageService.add({severity:'success', summary:'Success', detail:'votre témoignage a été  soumit', sticky: true});
        this.loadData();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
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
