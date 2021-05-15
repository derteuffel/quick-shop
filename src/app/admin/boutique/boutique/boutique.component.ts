import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { BoutiqueService } from '../../../services/boutique.service';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Boutique} from "../../../models/boutique";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css'],
  providers: [MessageService],
})
export class BoutiqueComponent implements OnInit {

  lists: any = {};
  p: number = 1;
  searchItem: string;
  boutique: Boutique;
  loading: boolean = true;
  boutiqueRef;
  public submitted: boolean = false;
  public boutiqueFormGroup?: FormGroup;
  public boutiqueUpdateFormGroup?: FormGroup;
  public currentBoutique;

  constructor(private boutiqueService: BoutiqueService,
              private fb: FormBuilder,
              private router: Router,
              private primengConfig: PrimeNGConfig,
              private modalService: NgbModal,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadAll();
    this.primengConfig.ripple = true;
    this.initForm();
  }

  initForm() {
    this.boutiqueFormGroup = new FormGroup({
      localisation: new FormControl(''),
      name: new FormControl(''),
      phone: new FormControl(''),
      region: new FormControl(''),
      cardNumber: new FormControl(''),
    })
  }


  loadAll(){
    this.boutiqueService.getAllBoutiques().subscribe(
     data => {
        this.lists = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  onSaveBoutique() {
    this.submitted = true;
    if (this.boutiqueFormGroup?.invalid) return;
    this.boutiqueService.saveBoutique(this.boutiqueFormGroup?.value).subscribe(
      (data: any) => {
       // this.router.navigateByUrl('/admin/boutiques');
        this.boutiqueFormGroup.reset();
        this.messageService.add({severity:'success', summary:'Success', detail:'boutique submitted', sticky: true});
        this.loadAll();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    );
    this.submitted = false;
  }


  // mise à jour d'une Boutique

  setBoutique(contentUpdate, event) {
    this.modalService.open(contentUpdate, {size: "lg"});
    this.currentBoutique = event.name
    this.boutiqueUpdateFormGroup.patchValue({
      id: event.id,
      name: event.name,
      localisation: event.localisation,
      phone: event.phone,
      region: event.region,
      cardNumber: event.cardNumber,
      status: event.status,
      activationCode: event.activationCode


    });

  }

  updateBoutique() {
    const CompanyData = {
      id: this.boutiqueUpdateFormGroup.get('id').value,
      name: this.boutiqueFormGroup.get('name').value,
      localisation: this.boutiqueFormGroup.get('localisation').value,
      phone: this.boutiqueFormGroup.get('phone').value,
      region: this.boutiqueFormGroup.get('region').value,
      cardNumber: this.boutiqueFormGroup.get('cardNumber').value,
      status: this.boutiqueFormGroup.get('status').value,
      activationCode: this.boutiqueFormGroup.get('activationCode').value,
    }
    this.boutiqueService.updateBoutique(CompanyData, this.boutique.id).subscribe(
      (data: any) => {
        this.boutiqueFormGroup.reset();
        this.messageService.add({severity:'success', summary: 'Record is updated successully', detail:'record updated'});
        this.loadAll();
      }, error => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
    )
  }


  showDetail(contentDetail, event){
    console.log(event)
    this.modalService.open(contentDetail, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  // detail d'une boutique
  getBoutique(){
    this.boutiqueService.getBoutique(this.boutiqueRef).subscribe(

      data => {
        this.currentBoutique = data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  // suppression d'une Boutique

  deleteBoutique(contentDelete, event) {
    console.log(event)
    this.modalService.open(contentDelete, {size: "lg"});
    this.boutiqueRef = event.id
    console.log(this.boutiqueRef);

  }

  onDelete() {
    this.boutiqueService.deleteBoutique(this.boutiqueRef).subscribe(
      (res : any) => {
        this.messageService.add({severity:'success', summary: 'Record is deleted successully', detail:'record delete'});
        this.loadAll();
      }
    )
  }
  sendCode(id){
    this.boutiqueService.sendCode(id).subscribe(
      data => {
        console.log('code has been to a seller');
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
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

  openModalAddCompany(contentAdd) {
    this.modalService.open(contentAdd, { size: 'lg' });

  }
}
