import { Component, OnInit } from '@angular/core';
import {AbonnementService} from "../services/abonnement.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BsModalService} from "ngx-bootstrap/modal";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SignUpInfo} from "../auth/requests/signup-info";
import {Abonnement} from "../models/abonnement";
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss'],
  providers: [MessageService],
})
export class AbonnementComponent implements OnInit {
  lists: any = [];
  longers: string[];
  currentLonger:string;
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
              private messageService: MessageService,
              private authService: AuthService) { }

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
      paiement: new FormControl(''),
      duree: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    })

  }

  loadData() {
    this.authService.currentUser.subscribe(data=>{
      if(data.role == Role.ADMIN){
        this.abonnementService.getAll().subscribe(
          data => {
            this.lists = data;
          }, error => {
            console.log(error);
          }
        );
      }else{
        this.abonnementService.getByUser(data.id).subscribe(
          data => {
            this.lists = data;
          }, error => {
            console.log(error);
          }
        );
      }
    });
  }
  /** ajouter un abonnement **/
  saveAbonnement() {
    let startDate = this.form.get('startDate').value;
    let endDate = this.form.get('endDate').value;
    if(startDate.getTime() < endDate.getTime()){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'The end date can not be greather than start date '});
    }else {
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

  }


  /** ajouter un abonnement **/
  saveAbon() {

    this.submitted = true;
    if(this.abonForm?.invalid){return;}
    let duree:FormControl = new FormControl('');
    duree.setValue(this.getDuree());
    this.abonForm.setControl("duree", duree);
    //this.abonForm.setValue({"duree": this.getDuree()});
    this.authService.currentUser.subscribe(data=>{
      this.abonnementService.saveAbonnementUser(this.abonForm.value, data.id).subscribe(
        (data: any) => {
          this.abonForm.reset();
          console.log(this.abonForm.value);
          this.messageService.add({severity:'success', summary:'Success', detail:'votre témoignage a été  soumit', sticky: true});
          this.loadData();
        }, error => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
        }
      );
    }, error=>{
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
    });
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

  deleteAbon(contentDelete, event){
    this.modalService.open(contentDelete, {size: 'lg'});
  }

  getDuree():number{
    let result:number = 30;
    switch(this.currentLonger){
      case '01 mois/2000 BIF(frais de renouvellement/mois 2000 BIF)':
        result = 30;
        break;
      case '03 mois/5000 BIF(frais de renouvellement/mois 1900 BIF)':
        result = 90;
        break;
      case '06 mois/9500 BIF(frais de renouvellement/mois 1800 BIF)':
        result = 180;
        break;
      case '12 mois/19500 BIF(frais de renouvellement/mois 1700 BIF)':
        result = 365;
        break;
      case '24 mois/44000 BIF(frais de renouvellement/mois 1600 BIF)':
        result = 730;
        break;
      case '36 mois/52000 BIF(frais de renouvellement/mois 1500 BIF)':
        result = 1095;
        break;
    }
    return result;
  }

}
